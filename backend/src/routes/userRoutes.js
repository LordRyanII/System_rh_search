const { Router } = require('express')
const { userController } = require('../controllers/userController')

const userRoutes = Router()

userRoutes.post('/', userController.validationCreate, userController.create)
userRoutes.post('/login', userController.validationLogin, userController.login)

module.exports = { userRoutes }