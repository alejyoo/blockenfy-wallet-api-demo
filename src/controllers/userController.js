import { SUCC_MESSAGE } from '../constants/index.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import {
  createUser as createUserService,
  listUsers as listUsersService
} from '../services/userService.js'

export const createUser = asyncHandler(async (_req, res) => {
  const userData = await createUserService()

  res.status(201).json({
    success: true,
    message: SUCC_MESSAGE.CREATE_USER,
    data: userData
  })
})

export const listUsers = asyncHandler(async (_req, res) => {
  const users = await listUsersService()

  res.json({
    succes: true,
    message: SUCC_MESSAGE.LIST_USERS,
    data: users
  })
})
