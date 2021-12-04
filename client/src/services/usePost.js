import { useNavigate } from 'react-router-dom'
import { server } from '@services/serverRequest'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'

export default function usePost() {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [fetchData, setFetchData] = useState(true)
    const [posts, setPosts] = useState([])
    //console.log(posts)
    const triggerDataFetch = () => setFetchData(t => !t)

    useEffect(() => {
        getPosts()
    }, [fetchData])

    // get posts
    const getPosts = async () => {
        try {
            const res = await server.get('/api/posts/')
            //console.log(res.data)
            setPosts(res.data)
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
    }

    const toFormData = (title, description, file) => {
        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('file', file)
        return formData
    }

    // create post
    const createPost = async (data) => {
        const { title, description, file } = data
        try {
            const res = await server.post(`/api/posts/`, toFormData(title, description, file), {
                headers: { 'content-type': 'multipart/form-data' }
            })
            //console.log(res)
            enqueueSnackbar(res.data.message, { variant: 'success' })
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
        triggerDataFetch()
    }

    // delete post
    const deletePost = async (id) => {
        try {
            const res = await server.delete(`/api/posts/${id}`)
            enqueueSnackbar(res.data.message, { variant: 'success' })
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
        triggerDataFetch()
    }

    // modify posts
    const modifyPost = async (id, data) => {
        const { title, description, file } = data
        try {
            const res = await server.put(`/api/posts/${id}`, toFormData(title, description, file))
            enqueueSnackbar(res.data.message, { variant: 'success' })
            navigate('/')
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
        triggerDataFetch()
    }
    // create comment
    const createComment = async (id, data) => {
        const { content } = data
        try {
            const res = await server.post(`/api/posts/${id}/comments`, { content })
            enqueueSnackbar(res.data.message, { variant: 'success' })
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
        triggerDataFetch()
    }
    // delete comment
    const deleteComment = async (postId, commentId) => {
        try {
            const res = await server.delete(`/api/posts/${postId}/comments/${commentId}`)
            enqueueSnackbar(res.data.message, { variant: 'success' })
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
        triggerDataFetch()
    }
    return {
        createPost,
        deletePost,
        modifyPost,
        posts,
        createComment,
        deleteComment,
    }
}