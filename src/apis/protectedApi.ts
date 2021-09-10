import express, { Request, Response } from 'express'

const router = express.Router()

//const { createUser } = require('../controller/userController')

router.get('/hi', (req: Request, res: Response ) => {
    console.log(req)
    res.send('protected page enter success')
})

export default  router
