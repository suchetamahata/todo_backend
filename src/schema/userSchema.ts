import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    uname: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
})

module.exports = userSchema
