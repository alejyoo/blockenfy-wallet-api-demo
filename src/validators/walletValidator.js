import { ERR_MESSAGE } from '#constants/index.js'
import { AppError } from '#middleware/errorHandler.js'

export const validateUserId = userId => {
  if (!userId) throw new AppError(ERR_MESSAGE.USER_ID_IS_REQUIRED, 400)
  if (typeof userId !== 'string')
    throw new AppError(ERR_MESSAGE.USER_NOT_STRING, 400)

  const trimmedId = userId.trim()
  if (!trimmedId) throw new AppError(ERR_MESSAGE.USER_ID_IS_REQUIRED, 400)

  return trimmedId
}
export const validateAmount = amount => {
  if (amount === undefined || amount === null) {
    throw new AppError(ERR_MESSAGE.NUMBER_IS_REQUIRED, 400)
  }

  const numAmount = Number(amount)

  if (Number.isNaN(numAmount) || !Number.isFinite(numAmount)) {
    throw new AppError(ERR_MESSAGE.NOT_NUMBER, 400)
  }

  return numAmount
}

export const validateTransferAmount = amount => {
  const numAmount = validateAmount(amount)
  if (numAmount <= 0)
    throw new AppError(ERR_MESSAGE.AMOUNT_MUST_BE_POSITIVE, 400)
  return numAmount
}

export const validateSufficientBalance = (balance, amount) => {
  const numBalance = validateAmount(balance)
  const numAmount = validateAmount(amount)

  if (numBalance < numAmount)
    throw new AppError(ERR_MESSAGE.INSUFFICIENT_FUNDS, 400)
  return true
}
