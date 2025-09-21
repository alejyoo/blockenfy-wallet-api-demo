import { prisma } from '../database/connection.js'

export const transferMoney = async (fromUserId, toUserId, amount) => {
  return await prisma.$transaction(async tx => {
    const updatedSender = await tx.user.update({
      where: { id: fromUserId },
      data: { balance: { decrement: amount } }
    })

    const updatedReceiver = await tx.user.update({
      where: { id: toUserId },
      data: { balance: { increment: amount } }
    })

    const transaction = await tx.transaction.create({
      data: { fromUserId, toUserId, amount }
    })

    return {
      transactionId: transaction.id,
      fromUserId,
      toUserId,
      amount: Number(amount),
      senderNewBalance: Number(updatedSender.balance),
      receiverNewBalance: Number(updatedReceiver.balance),
      timestamp: transaction.createdAt
    }
  })
}
