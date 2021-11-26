import { useNavigate } from 'react-router-dom'
import { server } from '@services/serverRequest'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'

export default function usePost() {
    const { enqueueSnackbar } = useSnackbar()
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    // get posts
    const getPosts = () => {
        const fetchData = async () => {
            const result = await server.get('/api/posts/')
            //console.log(result.data)
            setPosts(result.data)
        }
        useEffect(() => {
            fetchData()

        }, [])

        return posts
    }

    // create post
    const createPost = async (data) => {
        const { title, description, file } = data
        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('file', file)
        return server
            .post(`/api/posts/`, formData, { headers: { 'content-type': 'multipart/form-data' } })
            .then(res => {
                //console.log(res)
                enqueueSnackbar(res.data.message, { variant: 'success' })
            })
            .catch((error) => {
                console.log(error)
                enqueueSnackbar(/*error.res*/'Error', { variant: 'error' })
            })
    }

    // delete post
    const deletePost = async (id) => {
        return server.delete(`/api/posts/${id}`)
            .then(res => {
                enqueueSnackbar(res.data.message, { variant: 'success' })
            })
            .catch((error) => {
                console.log(error)
                enqueueSnackbar(/*error.res*/'Error', { variant: 'error' })
            })
    }

    // modify posts
    const modifyPost = async (id, data) => {
        const { title, description, file } = data
        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('file', file)

        return server.put(`/api/posts/${id}`, formData)
            .then(res => {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                enqueueSnackbar(/*error.res*/'Error', { variant: 'error' })
            })
    }
    getPosts()
    return {
        createPost,
        posts,
        deletePost,
        modifyPost
    }
}