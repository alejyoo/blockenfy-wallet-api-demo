import { DEFAULTS } from '#constants/index.js'
import { prisma } from '#database/connection.js'

export const createUser = async () => {
  const user = await prisma.user.create({
    data: { balance: DEFAULTS.INITIAL_BALANCE, currency: DEFAULTS.CURRENCY }
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
