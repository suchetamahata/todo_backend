
const express = require('express')
const { createTodos, listTodos, updateTodos, deleteTodo, listTodoByuuid, listByuuidAndComplete, listTodoByuname } = require('../controller/todosController')

const router = express.Router()

router.post('/create', createTodos)
router.get('/list-all', listTodos)
router.get('/listByuuid/:uuid', listTodoByuuid)
router.get('/listByuuidAndisCompleted/:uuid', listByuuidAndComplete)
router.patch('/update/:id', updateTodos)
router.delete('/delete/:id', deleteTodo)
router.delete('/listByName/:uname', listTodoByuname)

// router.checkout('/Getuuid/:uuid', checkUuid)

module.exports = router
