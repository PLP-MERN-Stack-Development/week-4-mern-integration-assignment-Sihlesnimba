import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../services/api'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchPosts()
        console.log('📦 Full API response:', response)

        // Use the correct path to the posts array
        const postsArray = response?.data?.posts

        if (Array.isArray(postsArray)) {
          setPosts(postsArray)
        } else {
          console.warn('⚠️ posts array not found:', response)
          setError('Unexpected response format from server.')
        }
      } catch (err) {
        console.error('❌ Failed to fetch posts:', err)
        setError('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    getPosts()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
