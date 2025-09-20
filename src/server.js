import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import config from './config.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import walletRoutes from './routes/walletRoutes.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    env: config.server.nodeEnv
  })
})

app.use(`${config.api.prefix}/${config.api.version}/wallet`, walletRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(config.server.port, () => {
  console.log(`Server open on port ${config.server.port}`)
})
