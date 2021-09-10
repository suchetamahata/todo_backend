import {TodoModel} from '../models/todoModel'
//import UserModel from '../models/userModel'
import { Request, Response } from 'express'


const updateTodos = async (req: Request, res: Response) => {
  try {
    const update = await TodoModel.findByIdAndUpdate(req.params.id, { isCompleted: req.body.isCompleted })
    res.json(update)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const data = await TodoModel.findByIdAndRemove(req.params.id)
    //const udata = await UserModel.findByIdAndRemove(req.prams.id)
    res.send(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const listTodos = async (req: Request, res: Response) => {
  try {
    const data = await TodoModel.find({})
    res.json(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
const createTodos = async (req: Request|any, res: Response) => {
  try {
    const todosPromises = req.body.map((todo: any) => {
      const newTodo = new TodoModel({
        item: todo.item,
        uname: req.loggedUser.uname,
        isCompleted: todo.isCompleted
      })
      console.log(newTodo)
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

const listTodoByuuid = async (req: Request, res: Response) => {
  try {
    const listItems = await TodoModel.find({ uuid: req.params.uuid })
    res.json(listItems)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const listTodoByuname = async (req: Request, res: Response) => {
  try {
    const Items = await TodoModel.find({ uname: req.params.uname })
    console.log(Items)
    res.json(Items)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const listByuuidAndComplete = async (req: Request, res: Response) => {
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
