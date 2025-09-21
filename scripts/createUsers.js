import { prisma } from '#src/database/connection.js'

const userData = [
  { balance: 150, currency: 'USD' },
  { balance: 100, currency: 'USD' },
  { balance: 0, currency: 'USD' }
]

const createUsers = async () => {
  try {
    console.log('🚀 Creating new users')

    const users = await Promise.all(
      userData.map(data => prisma.user.create({ data }))
    )
    console.table(
      users.map(user => ({
        ID: user.id,
        Balance: user.balance,
        Currency: user.currency
      }))
    )
  } catch (error) {
    console.error('❌ Error creating users', error)
  }
}

createUsers()
