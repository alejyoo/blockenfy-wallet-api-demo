import { prisma } from '#database/connection.js'
import {
  validateSufficientBalance,
  validateTransferAmount
} from '#validators/walletValidator.js'
import { findUserOrFail } from './helpers.js'

export const transferMoney = async (senderId, receiverId, amount) => {
  const validatedAmount = validateTransferAmount(amount)

  const sender = await findUserOrFail(senderId)
  await findUserOrFail(receiverId)

  validateSufficientBalance(sender.balance, validatedAmount)

  return prisma.$transaction(async tx => {
    const [updatedSender, updatedReceiver, transactionRecord] =
      await Promise.all([
        tx.user.update({
          where: { id: senderId },
          data: { balance: { decrement: validatedAmount } }
        }),
        tx.user.update({
          where: { id: receiverId },
          data: { balance: { increment: validatedAmount } }
        }),
        tx.transaction.create({
          data: {
            fromUserId: senderId,
            toUserId: receiverId,
            amount: validatedAmount
          }
        })
      ])

    return {
      transactionId: transactionRecord.id,
      fromUserId: senderId,
      toUserId: receiverId,
      amount: validatedAmount,
      senderNewBalance: Number(updatedSender.balance),
      receiverNewBalance: Number(updatedReceiver.balance),
      timestamp: transactionRecord.createdAt
    }
  })
}
