import { ERR_MESSAGE } from '#constants/index.js'
import { prisma } from '#database/connection.js'
import { AppError } from '#middleware/errorHandler.js'

export const getUserBalance = async userId => {
  await new Promise(resolve => setTimeout(resolve, 100))

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new AppError(ERR_MESSAGE.UNEXPECTED_ERROR, 404)

  return {
    userId: user.id,
    balance: parseFloat(user.balance),
    currency: user.currency
  }
}

export const rechargeBalance = async (userId, amount) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    throw new AppError(ERR_MESSAGE.USER_NOT_FOUND, 404)
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
