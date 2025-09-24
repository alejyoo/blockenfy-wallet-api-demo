import { SUCC_MESSAGE } from '#constants/index.js'
import { asyncHandler } from '#middleware/errorHandler.js'
import {
  createUser as createUserService,
  listUsers as listUsersService
} from '#services/userService.js'
import { validateDisplayName } from '#src/validators/walletValidator.js'

export const createUser = asyncHandler(async (req, res) => {
  const displayName = validateDisplayName(req.body.displayName)
  const data = await createUserService(displayName)

  res.status(201).json({
    success: true,
    message: SUCC_MESSAGE.CREATE_USER,
    data
  })
})

export const listUsers = asyncHandler(async (_req, res) => {
  const data = await listUsersService()

  res.json({
    succes: true,
    message: SUCC_MESSAGE.LIST_USERS,
    data
  })
})
