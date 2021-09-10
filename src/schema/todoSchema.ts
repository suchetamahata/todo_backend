import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  item: {
    required: true,
    type: String
  },
  isCompleted: {
    required: true,
    type: Boolean
  },
  uname: {
    required: true,
    type: String
  }
})

module.exports = todoSchema 
