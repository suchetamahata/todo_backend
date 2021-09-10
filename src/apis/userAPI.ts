import express, {Router} from 'express'

 const router = Router()

const { createUser, userLogin } = require('../controller/userController')

router.post('/create', createUser)
router.post('/login',userLogin)

export default  router
