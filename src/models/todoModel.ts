const mongoose = require('mongoose')
const todoSchema = require('../schema/todoSchema')

export const TodoModel = mongoose.model('todo', todoSchema)


