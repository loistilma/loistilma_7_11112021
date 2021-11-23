const express = require('express')
const router = express.Router()
const checkAuth = require('../middlewares/auth.middleware')

const userController = require('../controllers/user.controller')

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router