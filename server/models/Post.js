import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
  type: String,
  default: '',
},
})

export default mongoose.model('Post', postSchema)
