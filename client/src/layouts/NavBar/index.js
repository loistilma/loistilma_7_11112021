import React from 'react'
import AppBar from '@components/AppBar'
import { Outlet } from 'react-router'

export default () => {
    return (
        <>
            <AppBar />
            <Outlet />
        </>
    )
}


/*
import React, { useState, useEffect } from 'react'
import AppBar from '@components/AppBar'
import { server } from '@services/serverRequest'
import CreatePostForm from '@layouts/Post'
import CustomCard from '@components/Card'
import CustomAccordion from '@components/Accordion'
import Grid from '@mui/material/Grid'

export default () => {
    const [data, setData] = useState([])
    const getPosts = async () => {
        const result = await server.get('/api/posts/')
        //console.log(result.data)
        setData(result.data)
    }

    useEffect(async () => getPosts(), [])

    const Cards = () => (
        data.map(post => <CustomCard  post={post} key={post.id}/>)
    )
    const Cards = () => (
        <CustomCard post={posts.find(p => p.id === match.params.id)} />
    )
    return (
        <>
            <AppBar />
            <CustomAccordion accordionLegend={"Publier du contenu"}>
                <CreatePostForm inputsValue={{title:'', description:'', file:''}} />
            </CustomAccordion>
            <Grid container spacing={2}>
                <Cards />
            </Grid>
        </>
    )
}
*/