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
  if (amount === undefined || amount === null)
    throw new AppError(ERR_MESSAGE.NUMBER_IS_REQUIRED, 400)

  const numAmount = Number(amount)

  if (Number.isNaN(numAmount) || !Number.isFinite(numAmount))
    throw new AppError(ERR_MESSAGE.NOT_NUMBER, 400)

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

export const validateDisplayName = displayName => {
  if (!displayName) throw new AppError(ERR_MESSAGE.NAME_IS_REQUIRED, 400)

  if (typeof displayName !== 'string')
    throw new AppError(ERR_MESSAGE.NAME_IS_STRING, 400)

  const sanitizedName = displayName.trim()

  if (sanitizedName.length < 2)
    throw new AppError(ERR_MESSAGE.NAME_IS_SHORT, 400)

  if (sanitizedName.length > 50)
    throw new AppError(ERR_MESSAGE.NAME_IS_LONG, 400)

  return sanitizedName
}

export const validateCustomId = customId => {
  if (!customId) return null

  if (typeof customId !== 'string')
    throw new AppError(ERR_MESSAGE.CUSTOM_ID_NOT_STRING, 400)

  const sanitizedId = customId.trim()

  if (sanitizedId.length < 3)
    throw new AppError(ERR_MESSAGE.CUSTOM_ID_IS_SHORT, 400)

  if (sanitizedId.length > 30)
    throw new AppError(ERR_MESSAGE.CUSTOM_ID_IS_LONG, 400)

  if (!/^[a-zA-Z0-9_-]+$/.test(sanitizedId))
    throw new AppError(ERR_MESSAGE.CUSTOM_ID_NOT_VALID, 400)

  return sanitizedId
}
