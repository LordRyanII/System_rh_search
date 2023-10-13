const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true, index: 1 },
  password: { type: String, require: true, select: false },
  socialNetWork: { type: String },
  accountStatus: { type: Boolean },
  codeValidation: { type: String },
  validatedCode: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const userModel = mongoose.model('user', userSchema)

module.exports = { userModel }