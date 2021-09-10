require('dotenv').config()
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import express from 'express'

import todoApis from './apis/todoApi'
import userApis from './apis/userAPI'
import protectedApi from './apis/protectedApi'
import {authMiddleware} from './utils/auth'
import morgan from 'morgan'

const app = express()
const port = 8000

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, '../build')))
app.use('/todos', todoApis)
app.use('/user', userApis)
app.use('/protected', authMiddleware, protectedApi)
morgan('tiny')


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect(process.env.MON_URI || '', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log('Cant connect db')
  } else {
    console.log('Connected to db')
  }
})

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})
