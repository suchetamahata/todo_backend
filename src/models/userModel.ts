const mongoose = require('mongoose')
const userSchema = require('../schema/userSchema')

export const UserModel = mongoose.model('user', userSchema)


