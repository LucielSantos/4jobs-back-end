import 'reflect-metadata'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import './database'
import { router } from './routes'

const app = express()

app.use(cors())

app.use(express.json({ limit: '100mb' }))

app.use(router)

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running! \\o/')
})
