import { prisma } from '#src/database/connection.js'

const clearDatabase = async () => {
  try {
    console.log('🗑️  Cleaning database')
    await prisma.recharge.deleteMany()
    await prisma.transaction.deleteMany()
    await prisma.user.deleteMany()
  } catch (error) {
    console.error('❌ Error cleaning the database', error)
  }
}

clearDatabase()
