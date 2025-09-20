import { asyncHandler } from '../middleware/errorHandler.js'
import {
  createUser as createUserService,
  getUserBalance,
  listUsers as listUsersService,
  rechargeBalance
} from '../services/walletService.js'
import {
  validateAmount,
  validateUserId
} from '../validators/walletValidator.js'

export const getBalance = asyncHandler(async (req, res) => {
  const userId = validateUserId(req.params.userId)

  const balanceData = await getUserBalance(userId)

  res.json({
    success: true,
    data: balanceData
  })
})

export const recharge = asyncHandler(async (req, res) => {
  const userId = validateUserId(req.body.userId)
  const amount = validateAmount(req.body.amount)

  const rechargeData = await rechargeBalance(userId, amount)

  res.status(201).json({
    success: true,
    message: 'Recharge completed succes',
    data: rechargeData
  })
})

export const createUser = asyncHandler(async (_req, res) => {
  const userData = await createUserService()

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: userData
  })
})

export const listUsers = asyncHandler(async (_req, res) => {
  const users = await listUsersService()

  res.json({
    succes: true,
    message: `list of ${users.length} users`,
    data: users
  })
})
