import 'reflect-metadata'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import './database'
import { router } from './routes'

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
  next()
})

app.all('*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
})

app.use(cors())

app.use(express.json({ limit: '100mb' }))

app.use(router)

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running! \\o/')
})
