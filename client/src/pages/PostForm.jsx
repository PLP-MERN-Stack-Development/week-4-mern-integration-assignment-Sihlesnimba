import { useParams } from 'react-router-dom'

export default function PostForm() {
  const { id } = useParams()
  const isEditing = !!id

  return (
    <div>
      <h2>{isEditing ? 'Edit' : 'Create'} Post</h2>
      {/* We'll add form logic next */}
    </div>
  )
}
