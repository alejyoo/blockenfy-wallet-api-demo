import { ERR_MESSAGE } from '#constants/index.js'
import { prisma } from '#database/connection.js'
import { AppError } from '#middleware/errorHandler.js'

export const findUserOrFail = async identifier => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ id: identifier }, { customId: identifier }]
    }
  })
  if (!user) {
    throw new AppError(ERR_MESSAGE.USER_NOT_FOUND, 404)
  }

  return user
}
