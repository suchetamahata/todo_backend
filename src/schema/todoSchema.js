
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  uname: {
    required: true,
    type: String
  },
  item: {
    required: true,
    type: String
  },
  isCompleted: {
    required: true,
    type: Boolean
  }
})

// const NewtodoSchema = new mongoose.Schema({
//   uuid: String,
//   todos: [{
//     item: String,
//     isCompleted: Boolean
//   }]
// })
module.exports = todoSchema
