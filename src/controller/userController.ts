import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const secret = 'my super secret'
import {Request, Response} from 'express'

import {UserModel} from '../models/userModel'

const createUser = async(req:Request ,res: Response) =>{
  console.log(req.body)
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const user = await UserModel.findOne({ uname: req.body.uname })

        if(user === null){
            const newUser = new UserModel({
                uname: req.body.uname,
                password: hashedPassword,
            })
            const saveDoc = (await newUser.save()).toObject()
            delete saveDoc['password']
            delete saveDoc['_id']
            delete saveDoc['__v']

            res.json({
                message: 'New user created',
                data: saveDoc
            })
        }
        else{
            res.status(400).send('username already taken, try another name')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const userLogin = async (req:Request ,res: Response) => {
    try {
        const user = await UserModel.findOne({ uname: req.body.uname })
        console.log(user)
        const xyz = await bcrypt.compare(req.body.password, user.password)
        if (user === undefined || user === null) {
          res.status(400).send('no user by this name')
        }
        else if (xyz) {
          const trimmedUser = user.toObject()
          delete trimmedUser['password']
          delete trimmedUser['__v']
          delete trimmedUser['_id']
          const token = jwt.sign(trimmedUser,secret)
          res.json({
            message: 'logged in successfully',
            token,
            userid: trimmedUser._id
          })
        }
        else {
          res.send('wrong password/username')
        }
    } catch (error) {
        console.error(error)
        res.status(500)
      }
  }
  

module.exports = {createUser, userLogin}

