import { Router } from 'express'
import { getBalance, recharge } from '../controllers/balanceController.js'
import { getHistory } from '../controllers/historyController.js'
import { transfer } from '../controllers/transactionController.js'
import { createUser, listUsers } from '../controllers/userController.js'

const router = Router()

router.get('/balance/:userId', getBalance)
router.post('/recharge', recharge)
router.post('/user', createUser)
router.get('/users', listUsers)
router.post('/transfer', transfer)
router.get('/history/:userId', getHistory)

export default router
