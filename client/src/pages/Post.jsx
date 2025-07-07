import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostById } from '../services/api'

export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await fetchPostById(id)
        setPost(data)
      } catch {
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    getPost()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!post) return <p>Post not found</p>

  return (
    <div>
      <h2>{post.title}</h2>
      <p><strong>Category:</strong> {post.category}</p>
      <p>{post.content}</p>
    </div>
  )
}
