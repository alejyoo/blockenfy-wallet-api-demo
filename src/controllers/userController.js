import { asyncHandler } from '../middleware/errorHandler.js'
import {
  createUser as createUserService,
  listUsers as listUsersService
} from '../services/userService.js'

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
