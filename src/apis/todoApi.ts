const { createTodos, listTodos, updateTodos, deleteTodo, listTodoByuuid, listByuuidAndComplete, listTodoByuname } = require('../controller/todosController')
import { authMiddleware } from '../utils/auth'
import express, { Router } from 'express'


const router = express.Router()

router.post('/create',authMiddleware, createTodos)
router.get('/list-all', listTodos)
router.get('/listByuuid/:uuid', listTodoByuuid)
router.get('/listByuuidAndisCompleted/:uuid', listByuuidAndComplete)
router.patch('/update/:id',authMiddleware, updateTodos)
router.delete('/delete/:id',authMiddleware, deleteTodo)
router.get('/listByName/:uname', listTodoByuname)

// router.checkout('/Getuuid/:uuid', checkUuid)

export default  router
