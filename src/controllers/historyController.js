import { SUCC_MESSAGE } from '#constants/index.js'
import { asyncHandler } from '#middleware/errorHandler.js'
import { getUserHistory } from '#services/historyService.js'
import { validateUserId } from '#validators/walletValidator.js'

export const getHistory = asyncHandler(async (req, res) => {
  const userId = validateUserId(req.params.userId)

  const historyData = await getUserHistory(userId)

  res.json({
    success: true,
    message: SUCC_MESSAGE.GET_HISTORY,
    data: historyData
  })
})
