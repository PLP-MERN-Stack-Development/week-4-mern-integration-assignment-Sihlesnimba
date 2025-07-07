import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
})

// Posts
export const fetchPosts = () => API.get('/posts')
export const fetchPostById = (id) => API.get(`/posts/${id}`)
export const createPost = (postData) => API.post('/posts', postData)
export const updatePost = (id, postData) => API.put(`/posts/${id}`, postData)
export const deletePost = (id) => API.delete(`/posts/${id}`)
