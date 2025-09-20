import { AppError } from '../middleware/errorHandler.js'

const users = {
  alejandro: { id: 'alejandro', balance: 0, currency: 'USD' }
}

export const getUserBalance = async userId => {
  await new Promise(resolve => setTimeout(resolve, 100))

  const user = users[userId]

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return {
    userId: user.id,
    balance: user.balance,
    currency: user.currency
  }
}
