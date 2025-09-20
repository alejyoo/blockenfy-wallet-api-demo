import { prisma } from '../database/connection.js'
import { AppError } from '../middleware/errorHandler.js'

export const getUserBalance = async userId => {
  await new Promise(resolve => setTimeout(resolve, 100))

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new AppError('User not found', 404)

  return {
    userId: user.id,
    balance: parseFloat(user.balance),
    currency: user.currency
  }
}

export const rechargeBalance = async (userId, amount) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    throw new AppError('User not found', 404)
  }

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
    userId: updateUser.id,
    amountRecharge: parseFloat(recharge.amount),
    newBalance: parseFloat(updateUser.balance),
    transactionId: recharge.id,
    timestamp: recharge.createdAt
  }
}

export const createUser = async () => {
  const user = await prisma.user.create({
    data: { balance: 0, currency: 'USD' }
  })

  return {
    userId: user.id,
    balance: parseFloat(user.balance),
    currency: user.currency,
    createdAt: user.createdAt
  }
}

export const listUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return users.map(user => ({
    userId: user.id,
    balance: parseFloat(user.balance),
    currency: user.currency,
    createdAt: user.createdAt
  }))
}
