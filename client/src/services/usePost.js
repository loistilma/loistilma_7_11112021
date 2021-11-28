import { useNavigate } from 'react-router-dom'
import { server } from '@services/serverRequest'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'

export default function usePost() {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [fetchData, setFetchData] = useState(true)
    const [posts, setPosts] = useState([])

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
        } catch (error) {
            console.log(error)
            enqueueSnackbar(/*error.res*/'Error', { variant: 'error' })
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
            triggerDataFetch()
        } catch (error) {
            console.log(error)
            enqueueSnackbar(/*error.res*/'Error', { variant: 'error' })
        }
    }

    // delete post
    const deletePost = async (id) => {
        return server.delete(`/api/posts/${id}`)
            .then(res => {
                
                enqueueSnackbar(res.data.message, { variant: 'success' })
                triggerDataFetch()
            })
            .catch((error) => {
                console.log(error)
                enqueueSnackbar(/*error.res*/'Error', { variant: 'error' })
            })
    }

    // modify posts
    const modifyPost = async (id, data) => {
        const { title, description, file } = data
        return server.put(`/api/posts/${id}`, toFormData(title, description, file))
            .then(res => {
                
                enqueueSnackbar(res.data.message, { variant: 'success' })
                triggerDataFetch()
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                enqueueSnackbar(/*error.res*/'Error', { variant: 'error' })
            })
    }
    return {
        createPost,
        posts,
        deletePost,
        modifyPost
    }
}