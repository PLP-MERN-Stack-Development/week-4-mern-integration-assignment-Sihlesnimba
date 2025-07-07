import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import PostForm from './pages/PostForm.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />
      </Routes>
    </>
  )
}
