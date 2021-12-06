const express = require('express')
const router = express.Router()
const checkAuth = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')

const commentController = require('../controllers/comment.controller')
const postController = require('../controllers/post.controller')

router.get('/', checkAuth, postController.get)
router.get('/:id', checkAuth, postController.getById)
router.post('/', checkAuth, upload, postController.create)
router.put('/:id', checkAuth, upload, postController.modify)
router.delete('/:id', checkAuth, postController.delete)

router.get('/:id/comments',checkAuth, commentController.get)
router.post('/:id/comments',checkAuth, commentController.create)
router.delete('/:postId/comments/:commentId', checkAuth, commentController.delete)

module.exports = router