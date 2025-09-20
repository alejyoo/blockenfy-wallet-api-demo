import { Router } from 'express'
import { getBalance } from '../controllers/walletController.js'

const router = Router()

router.get('/balance/:userId', getBalance)

export default router
