import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import './database'
import { router } from './routes'

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.get('/', (req, res) => {
  res.send().status(200)
})

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running! \\o/')
})
