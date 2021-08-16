const mongoose = require('mongoose')
const todoSchema = require('../schema/todoSchema')

const todoModel = mongoose.model('todo', todoSchema)

module.exports = todoModel
