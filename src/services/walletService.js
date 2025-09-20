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
