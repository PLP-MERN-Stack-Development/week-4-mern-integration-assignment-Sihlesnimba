import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import commentRoutes from './routes/commentRoutes.js' // ✅ NEW

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/comments', commentRoutes) // ✅ NEW

// Serve static images from /uploads
app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')))

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...')
})

// MongoDB Connection
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
  })
