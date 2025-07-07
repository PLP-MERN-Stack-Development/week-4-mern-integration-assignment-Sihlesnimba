import express from 'express'
import { createComment, getCommentsByPost } from '../controllers/commentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/:id', protect, createComment)
router.get('/:id', getCommentsByPost)

export default router
