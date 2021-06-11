import 'reflect-metadata'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import './database'
import { router } from './routes'

const app = express()

const allowCrossDomain = function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  // intercept OPTIONS method
  // eslint-disable-next-line
  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
}

app.use(allowCrossDomain)

// app.use(cors())

app.use(express.json({ limit: '100mb' }))

app.use(router)

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running! \\o/')
})
