import { prisma } from '../database/connection.js'

export const getUserHistory = async userId => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new AppError('User not found', 404)

  const [recharges, sentTransactions, receivedTransactions] = await Promise.all(
    [
      prisma.recharge.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.transaction.findMany({
        where: { fromUserId: userId },
        include: { toUser: true },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.transaction.findMany({
        where: { toUserId: userId },
        include: { fromUser: true },
        orderBy: { createdAt: 'desc' }
      })
    ]
  )

  const formatTransaction = ({
    id,
    amount,
    type,
    description,
    relatedUserId,
    timestamp
  }) => ({
    id,
    type,
    amount: parseFloat(amount),
    description,
    relatedUserId,
    timestamp
  })

  const history = [
    ...recharges.map(r =>
      formatTransaction({
        id: r.id,
        amount: r.amount,
        type: 'recharge',
        description: 'Money recharge',
        timestamp: r.createdAt
      })
    ),
    ...sentTransactions.map(t =>
      formatTransaction({
        id: t.id,
        amount: -t.amount,
        type: 'transfer_sent',
        description: `Transfer sent to user ${t.toUserId}`,
        relatedUserId: t.toUserId,
        timestamp: t.createdAt
      })
    ),
    ...receivedTransactions.map(t =>
      formatTransaction({
        id: t.id,
        amount: t.amount,
        type: 'transfer_received',
        description: `Transfer received from user ${t.fromUserId}`,
        relatedUserId: t.fromUserId,
        timestamp: t.createdAt
      })
    )
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  return {
    userId,
    currentBalance: parseFloat(user.balance),
    totalMovements: history.length,
    history
  }
}
