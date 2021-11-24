import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@components/AppBar'
import { server } from '@services/serverRequest'
import PostForm from '@layouts/Post'

export default () => {
    /*
    const [data, setData] = useState()
    useEffect(async () => {
        const result = await server.get('/api/posts/')
        console.log(result.data)
        setData(result.data)
    }, [])
    */
    return (
        <>
            <AppBar />
            <PostForm />
        </>
    )
}