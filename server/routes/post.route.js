const express = require('express')
const router = express.Router()
const checkAuth = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')

const postController = require('../controllers/post.controller')

router.get('/', checkAuth, postController.get)
router.post('/', checkAuth, upload, postController.create)
//router.get('/:id', checkAuth, postController.getById)
//router.post('/', checkAuth, upload, postController.create)
//router.put('/:id', checkAuth, checkSauceAdmin, upload, saucesController.modify)
//router.delete('/:id', checkAuth, checkSauceAdmin, saucesController.delete)
//router.post('/:id/like', checkAuth, saucesController.setLike)

module.exports = router