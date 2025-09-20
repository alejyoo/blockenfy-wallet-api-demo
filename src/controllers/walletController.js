import { asyncHandler } from '../middleware/errorHandler.js'
import { getUserBalance } from '../services/walletService.js'
import { validateUserId } from '../validators/walletValidator.js'

export const getBalance = asyncHandler(async (req, res) => {
  const userId = validateUserId(req.params.userId)

  const balanceData = await getUserBalance(userId)

  res.json({
    success: true,
    data: balanceData
  })
})
