const express = require('express')
const router = express.Router()
const checkAuth = require('../middlewares/auth.middleware')

const postController = require('../controllers/post.controller')

//router.post('/', checkAuth, postController.create)
//router.put('/post/:id', checkAuth, postController.modify)
//router.delete('/post/:id', checkAuth, postController.delete)

module.exports = router