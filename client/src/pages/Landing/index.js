import React from 'react'
import PostForm from '@layouts/PostForm'
import CustomCard from '@components/Card'
import CustomAccordion from '@components/Accordion'
import Grid from '@mui/material/Grid'
import usePost from '@services/usePost'
import { useParams } from 'react-router-dom'

export default () => {
    const { posts } = usePost()
    const { postId } = useParams()
    const post = posts.find(p => p.id === parseInt(postId))
    const Cards = () => {
        return (
            <>
                <CustomAccordion accordionLegend={"Publier du contenu"}>
                    <PostForm inputsValue={{ title: '', description: '', file: '' }} />
                </CustomAccordion>
                <Grid container spacing={2}>
                    {posts.map(post => <CustomCard post={post} key={post.id} />)}
                </Grid>
            </>       
            
        )
    }
    const Card = () => {
        return (
            <>  
                <CustomAccordion accordionLegend={"Modifier le contenu"}>
                    <PostForm inputsValue={{ title: post?.title, description: post?.description, file: '' }} postId={postId}/>
                </CustomAccordion>
                <Grid container spacing={2}>
                    <CustomCard post={post} />
                </Grid>
            </>
        )
    }
    return (
        <>
            {postId
                ? <Card />
                : <Cards />
            }
        </>
    )
}