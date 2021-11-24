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
        const { title, description } = data
        return server.post(`/api/posts/`, {
            title, description
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