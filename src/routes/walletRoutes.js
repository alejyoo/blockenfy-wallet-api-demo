import { Router } from 'express'
import { getBalance, recharge } from '../controllers/balanceController.js'
import { createUser, listUsers } from '../controllers/userController.js'

const router = Router()

router.get('/balance/:userId', getBalance)
router.post('/recharge', recharge)
router.post('/user', createUser)
router.get('/users', listUsers)

export default router
