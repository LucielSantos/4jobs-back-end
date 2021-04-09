import express from 'express'

import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello world finish' })
})

app.listen(process.env.PORT || 3333)
