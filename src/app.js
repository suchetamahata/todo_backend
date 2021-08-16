require('dotenv').config()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const todoApis = require('./apis/todoApi')
const morgan = require('morgan')

const app = express()
const port = 8000

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use('/todos', todoApis)

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
