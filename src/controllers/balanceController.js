import { SUCC_MESSAGE } from '../constants/index.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { getUserBalance, rechargeBalance } from '../services/balanceService.js'
import {
  validateAmount,
  validateUserId
} from '../validators/walletValidator.js'

export const getBalance = asyncHandler(async (req, res) => {
  const userId = validateUserId(req.params.userId)

  const balanceData = await getUserBalance(userId)

  res.json({
    success: true,
    message: SUCC_MESSAGE.GET_BALANCE,
    data: balanceData
  })
})

export const recharge = asyncHandler(async (req, res) => {
  const userId = validateUserId(req.body.userId)
  const amount = validateAmount(req.body.amount)

  const rechargeData = await rechargeBalance(userId, amount)

  res.status(201).json({
    success: true,
    message: SUCC_MESSAGE.RECHARGE,
    data: rechargeData
  })
})
