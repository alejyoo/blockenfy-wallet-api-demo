import { Router } from 'express'
import {
  createUser,
  getBalance,
  recharge
} from '../controllers/walletController.js'

const router = Router()

router.get('/balance/:userId', getBalance)
router.post('/recharge', recharge)
router.post('/user', createUser)

export default router
