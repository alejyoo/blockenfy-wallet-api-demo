import { asyncHandler } from '#src/middleware/errorHandler.js'
import { getUserProfile, updateUser } from '#src/services/profileService.js'
import {
  validateCustomId,
  validateDisplayName,
  validateUserId
} from '#src/validators/walletValidator.js'
import { ERR_MESSAGE, SUCC_MESSAGE } from '../constants/index.js'

export const profileUser = asyncHandler(async (req, res) => {
  const userId = validateUserId(req.params.userId)
  const profile = await getUserProfile(userId)

  res.json(profile)
})

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = validateUserId(req.params.userId)
  const updateData = {}

  if (req.body.displayName !== undefined) {
    updateData.displayName = validateDisplayName(req.body.displayName)
  }

  if (req.body.customId !== undefined) {
    updateData.customId = validateCustomId(req.body.customId)
  }

  if (Object.keys(updateData).length === 0) {
    throw new AppError(ERR_MESSAGE.UPDATE_NOT_VALID, 400)
  }

  const updatedUser = await updateUser(userId, updateData)

  res.json({
    success: true,
    message: SUCC_MESSAGE.UPDATE_PROFILE,
    data: updatedUser
  })
})
