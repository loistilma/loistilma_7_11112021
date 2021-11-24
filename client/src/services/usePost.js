import React, { useState, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '@services/serverRequest'
import { useSnackbar } from 'notistack'

export default function usePost() {
    const { enqueueSnackbar } = useSnackbar()
    //let navigate = useNavigate()
    //const [jwt, setJwt] = useState(storedJwt || null)

    // create post
    const createPost = async (data) => {
        const { title, description, file } = data
        let formData = new FormData()
        /*
        Object.keys(title).map((key, value) => {
            formData.append(key, value)
        })
        */
        formData.append('title', title)
        formData.append('description', description)
        formData.append('file', file)

        return server.post(`/api/posts/`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res)
            enqueueSnackbar(/*res.data.message*/'Posted', { variant: 'success' })
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar(/*error.res*/'Error', { variant: 'error' })
        })
    }

    return {
        createPost
    }
}