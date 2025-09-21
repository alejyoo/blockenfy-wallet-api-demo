import { ERR_MESSAGE } from '#constants/index.js'
import { prisma } from '#database/connection.js'
import { AppError } from '#middleware/errorHandler.js'

export const findUserOrFail = async userId => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new AppError(ERR_MESSAGE.USER_NOT_FOUND, 404)
  }

  return user
}
