import { DESCRIPTION_TYPES, TYPES } from '#constants/index.js'
import { prisma } from '#database/connection.js'
import { findUserOrFail } from './helpers.js'

const mapRechargeToHistory = recharge => ({
  id: recharge.id,
  type: TYPES.RECHARGE,
  amount: Number(recharge.amount),
  description: DESCRIPTION_TYPES.RECHARGE,
  timestamp: recharge.createdAt
})

const mapSentTransactionToHistory = tx => ({
  id: tx.id,
  type: TYPES.TRANSFER.SENT,
  amount: -Number(tx.amount),
  description: `${DESCRIPTION_TYPES.TRANSFER.SENT} ${tx.toUserId}`,
  relatedUserId: tx.toUserId,
  timestamp: tx.createdAt
})

const mapReceivedTransactionToHistory = tx => ({
  id: tx.id,
  type: TYPES.TRANSFER.RECEIVED,
  amount: Number(tx.amount),
  description: `${DESCRIPTION_TYPES.TRANSFER.RECEIVED} ${tx.fromUserId}`,
  relatedUserId: tx.fromUserId,
  timestamp: tx.createdAt
})

export const getUserHistory = async userId => {
  const user = await findUserOrFail(userId)

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

  const history = [
    ...recharges.map(mapRechargeToHistory),
    ...sentTransactions.map(mapSentTransactionToHistory),
    ...receivedTransactions.map(mapReceivedTransactionToHistory)
  ].sort((a, b) => b.timestamp - a.timestamp)

  return {
    userId,
    currentBalance: Number(user.balance),
    totalMovements: history.length,
    history
  }
}
