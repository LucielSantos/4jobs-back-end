import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import './database'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello world' })
})

app.listen(process.env.PORT || 3333, (err) => {
  !err && console.log('Server is running! \\o/')
})
