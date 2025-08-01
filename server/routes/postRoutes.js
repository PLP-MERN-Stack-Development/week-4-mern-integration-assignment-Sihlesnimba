import express from 'express'
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js' // ✅ Import middleware

const router = express.Router()

// Public Routes
router.get('/', getPosts)
router.get('/:id', getPostById)

// Protected Routes
router.post('/', protect, createPost)
router.put('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)

export default router
