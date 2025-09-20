import { Router } from 'express'
import { getBalance, recharge } from '../controllers/walletController.js'

const router = Router()

router.get('/balance/:userId', getBalance)
router.post('/recharge', recharge)

export default router
