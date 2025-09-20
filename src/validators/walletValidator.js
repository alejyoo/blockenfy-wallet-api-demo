import { AppError } from '../middleware/errorHandler.js'

export const validateUserId = userId => {
  if (!userId) {
    throw new AppError('User ID is required', 400)
  }
  if (typeof userId !== 'string') {
    throw new AppError('User ID must be a string', 400)
  }

  if (userId.trim().length < 3) {
    throw new AppError('User ID must be at least 3 characters', 400)
  }

  return userId.trim()
}
