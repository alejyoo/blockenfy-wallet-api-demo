import { prisma } from '#database/connection.js'
import { ERR_MESSAGE } from '#src/constants/index.js'
import { AppError } from '#src/middleware/errorHandler.js'
import { getUserBalance } from './balanceService.js'
import { findUserOrFail } from './helpers.js'
import { getUserHistory } from './historyService.js'

export const getUserProfile = async userId => {
  const balanceData = await getUserBalance(userId)
  const historyData = await getUserHistory(userId)

  return {
    userId: balanceData.userId,
    displayName: balanceData.displayName,
    balance: balanceData.balance,
    currency: balanceData.currency,

    totalMovements: historyData.totalMovements,
    history: historyData.history
  }
}

const validateUniqueCustomId = async (customId, userId) => {
  if (!customId) return

  const existing = await prisma.user.findUnique({ where: { customId } })
  if (existing && existing.id !== userId) {
    throw new AppError(ERR_MESSAGE.CUSTOM_ID_IS_EXIST, 409)
  }
}

const mapUpdatedUser = user => ({
  userId: user.id,
  displayName: user.displayName,
  customId: user.customId,
  balance: parseFloat(user.balance),
  currency: user.currency,
  updatedAt: user.updatedAt
})

export const updateUser = async (userId, { displayName, customId }) => {
  await findUserOrFail(userId)

  await validateUniqueCustomId(customId, userId)

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(displayName && { displayName }),
        ...(customId !== undefined && { customId })
      }
    })

    return mapUpdatedUser(updatedUser)
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('customId')) {
      throw new AppError(ERR_MESSAGE.CUSTOM_ID_IS_EXIST, 409)
    }
  }
}
