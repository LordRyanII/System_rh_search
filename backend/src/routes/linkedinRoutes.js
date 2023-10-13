const { Router } = require('express')

const linkedinController = require('../controllers/linkedinController')
const linkedinRoutes = Router()

linkedinRoutes.post('/send-message', linkedinController.sendMessage)

module.exports = { linkedinRoutes }