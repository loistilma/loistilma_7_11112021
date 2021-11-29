import React from 'react'
import PostForm from '@layouts/PostForm'
import CustomCard from '@components/Card'
import CustomAccordion from '@components/Accordion'
import Grid from '@mui/material/Grid'
import usePost from '@services/usePost'
import { useParams } from 'react-router-dom'

export default () => {
    const { posts, deletePost, createPost, modifyPost } = usePost()

    const { postId } = useParams()
    const post = posts.find(p => p.id === parseInt(postId))
    const Cards = () => {
        return (
            <>
                <CustomAccordion accordionLegend={"Publier du contenu"}>
                    <PostForm 
                        inputsValue={{ title: '', description: '', file: '' }} 
                        requestFunction={createPost} 
                        textButton={'Publier'} 
                        formLegend={'Créer un post'} 
                    />
                </CustomAccordion>
                <Grid container spacing={2}>
                    {posts.map(post => <CustomCard post={post} key={post.id} handleDelete={() => deletePost(post.id)} cardLink={`/post/${post.id}`} />)}
                </Grid>
            </>

        )
    }
    const Card = () => {
        return (
            <>
                <CustomAccordion accordionLegend={"Modifier le contenu"}>
                    <PostForm 
                        inputsValue={{ title: post.title, description: post.description, file: post.file }} 
                        requestFunction={modifyPost} 
                        postId={postId} 
                        textButton={'Modifier'} 
                        formLegend={'Modifier un post'} 
                    />
                </CustomAccordion>
                <Grid container spacing={2}>
                    <CustomCard post={post} handleDelete={() => deletePost(post.id)} cardLink={`/post/${post.id}`} />
                </Grid>
            </>
        )
    }
    return (
        <>
            {/*loading && <div>data is loading</div>*/}
            {postId && <Card />}
            {!postId && <Cards />}
        </>
    )
}