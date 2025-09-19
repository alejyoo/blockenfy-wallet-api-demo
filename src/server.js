import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import config from './config.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => {
  res.json({
    sucess: true,
    timestamp: new Date().toISOString(),
    env: config.server.nodeEnv
  })
})

app.listen(config.server.port, () => {
  console.log(`Server open on port ${config.server.port}`)
})
