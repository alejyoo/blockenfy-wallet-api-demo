import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error']
})

export const connectDatabase = async () => {
  try {
    await prisma.$connect()
    console.log('DB connected')
  } catch (error) {
    console.log('DB failed', error)
    process.exit(1)
  }
}

export const disconnectedDatabase = async () => {
  await prisma.$disconnect()
}

export { prisma }
