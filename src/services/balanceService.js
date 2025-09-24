import { prisma } from '#database/connection.js'
import { findUserOrFail } from './helpers.js'

export const getUserBalance = async userId => {
  const user = await findUserOrFail(userId)

  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    userId: user.id,
    customId: user.customId,
    displayName: user.displayName,
    balance: parseFloat(user.balance),
    currency: user.currency
  }
}

export const rechargeBalance = async (userId, amount) => {
  const user = await findUserOrFail(userId)

  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      balance: {
        increment: amount
      }
    }
  })

  const recharge = await prisma.recharge.create({
    data: { userId: user.id, amount: amount }
  })

  return {
    userId: user.id,
    customId: user.customId,
    displayName: user.displayName,
    amountRecharge: parseFloat(recharge.amount),
    newBalance: parseFloat(updateUser.balance),
    transactionId: recharge.id,
    timestamp: recharge.createdAt
  }
}
