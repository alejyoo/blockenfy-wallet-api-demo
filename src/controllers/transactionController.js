import { SUCC_MESSAGE } from '#constants/index.js'
import { asyncHandler } from '#middleware/errorHandler.js'
import { transferMoney } from '#services/transactionService.js'
import { validateAmount, validateUserId } from '#validators/walletValidator.js'

export const transfer = asyncHandler(async (req, res) => {
  const fromUserId = validateUserId(req.body.fromUserId)
  const toUserId = validateUserId(req.body.toUserId)
  const amount = validateAmount(req.body.amount)

  const transferData = await transferMoney(fromUserId, toUserId, amount)

  res.status(201).json({
    success: true,
    message: SUCC_MESSAGE.TRANSACTION,
    data: transferData
  })
})
