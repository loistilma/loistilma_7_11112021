const express = require('express')
const router = express.Router()
const checkAuth = require('../middlewares/auth.middleware')

const userController = require('../controllers/user.controller')

router.get('/:id', checkAuth, userController.get)
router.delete('/:id', checkAuth, userController.delete)

module.exports = router