import Comment from '../models/Comment.js'

export const createComment = async (req, res) => {
  const { content } = req.body
  const postId = req.params.id

  try {
    const comment = await Comment.create({
      content,
      post: postId,
      user: req.user._id,
    })

    res.status(201).json(comment)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getCommentsByPost = async (req, res) => {
  const postId = req.params.id

  try {
    const comments = await Comment.find({ post: postId })
      .populate('user', 'username')
      .sort({ createdAt: -1 })

    res.json(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
