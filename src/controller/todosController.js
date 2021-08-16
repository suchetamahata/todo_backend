const TodoModel = require('../models/todoModel')

const updateTodos = async (req, res) => {
  try {
    const update = await TodoModel.findByIdAndUpdate(req.params.id, { isCompleted: req.body.isCompleted })
    res.json(update)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const deleteTodo = async (req, res) => {
  try {
    const data = await TodoModel.findByIdAndRemove(req.params.id)
    res.send(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const listTodos = async (req, res) => {
  try {
    const data = await TodoModel.find({})
    res.json(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
const createTodos = async (req, res) => {
  try {
    const todosPromises = req.body.map((todo) => {
      const newTodo = new TodoModel({
        uuid: todo.uuid,
        item: todo.item,
        uname: todo.uname,
        isCompleted: todo.isCompleted
      })
      return newTodo.save()
    })
    const saveDoc = await Promise.all(todosPromises)
    res.json({
      message: 'New doc saved Sucessfully',
      data: saveDoc
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

const listTodoByuuid = async (req, res) => {
  try {
    const listItems = await TodoModel.find({ uuid: req.params.uuid })
    res.json(listItems)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const listTodoByuname = async (req, res) => {
  try {
    const Items = await TodoModel.find({ uname: req.params.uname })
    res.json(Items)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const listByuuidAndComplete = async (req, res) => {
  try {
    console.log(req.params, req.query)
    const list = await TodoModel.find({ uuid: req.params.uuid, isCompleted: req.query.iscompleted })
    res.json(list)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
module.exports = {
  createTodos,
  listTodos,
  updateTodos,
  deleteTodo,
  listTodoByuuid,
  listByuuidAndComplete,
  listTodoByuname
}
