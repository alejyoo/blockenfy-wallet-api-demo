import { ERR_MESSAGE } from '../constants/index.js'
import { AppError } from '../middleware/errorHandler.js'

export const validateUserId = userId => {
  if (!userId) {
    throw new AppError(ERR_MESSAGE.USER_ID_IS_REQUIRED, 400)
  }
  if (typeof userId !== 'string') {
    throw new AppError(ERR_MESSAGE.USER_NOT_STRING, 400)
  }

  return userId.trim()
}

export const validateAmount = amount => {
  if (!amount && amount !== 0) {
    throw new AppError(ERR_MESSAGE.NUMBER_IS_REQUIRED, 400)
  }
  const numAmount = Number(amount)

  if (Number.isNaN(numAmount)) {
    throw new AppError(ERR_MESSAGE.NOT_NUMBER, 400)
  }

  return numAmount
}
