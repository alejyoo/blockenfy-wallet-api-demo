import { Router } from 'express'
import {
  createUser,
  getBalance,
  listUsers,
  recharge
} from '../controllers/walletController.js'

const router = Router()

router.get('/balance/:userId', getBalance)
router.post('/recharge', recharge)
router.post('/user', createUser)
router.get('/users', listUsers)

export default router
