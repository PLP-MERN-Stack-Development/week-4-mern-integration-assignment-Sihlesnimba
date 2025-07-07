import Post from '../models/Post.js'

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6
    const skip = (page - 1) * limit

    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { content: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {}

    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {}

    const filters = { ...keyword, ...categoryFilter }

    const total = await Post.countDocuments(filters)

    const posts = await Post.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}



// Get a single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create a new post
export const createPost = async (req, res) => {
  const { title, content, category } = req.body
  try {
    const newPost = await Post.create({ title, content, category })
    res.status(201).json(newPost)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Update a post
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' })
    res.json(updatedPost)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Post not found' })
    res.json({ message: 'Post deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
