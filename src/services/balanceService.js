import { prisma } from '#database/connection.js'
import { findUserOrFail } from './helpers'

export const getUserBalance = async userId => {
  const user = findUserOrFail(userId)

  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    userId: user.id,
    balance: parseFloat(user.balance),
    currency: user.currency
  }
}

export const rechargeBalance = async (userId, amount) => {
  const user = findUserOrFail(userId)

  const updateUser = await prisma.user.update({
    where: { id: userId },
    data: {
      balance: {
        increment: amount
      }
    }
  })

  const recharge = await prisma.recharge.create({
    data: { userId: userId, amount: amount }
  })

  return {
    userId: user.id,
    amountRecharge: parseFloat(recharge.amount),
    newBalance: parseFloat(updateUser.balance),
    transactionId: recharge.id,
    timestamp: recharge.createdAt
  }
}
