import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import accountsRoute from './api/routes/accounts.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

dotenv.config()

const dirname = path.resolve()

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8181')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(morgan('dev'))
app.use(express.static(path.join(dirname, '/public')))
app.use(express.json())

app.use('/account', accountsRoute)
app.use(errorHandler)
app.use(notFoundHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on Port ${PORT}`))
