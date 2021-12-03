import React from 'react'
import PostForm from '@layouts/PostForm'
import CustomCard from '@components/Card'
import CustomAccordion from '@components/Accordion'
import usePost from '@services/usePost'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';

export default () => {
    const { posts, deletePost, createPost, modifyPost, createComment, deleteComment } = usePost()

    const { postId } = useParams()
    const post = posts.find(p => p.id === parseInt(postId))
    const Cards = () => {
        return (
            <>
                <CustomAccordion accordionLegend={"Cliquer ici pour rédiger un post"}>
                    <PostForm
                        inputsValue={{ title: '', description: '', file: '' }}
                        createPost={createPost}
                        textButton={'Publier'}
                        formLegend={'Créer un post'}
                    />
                </CustomAccordion>
                {posts.map(post => <CustomCard post={post} key={post.id} deletePost={() => deletePost(post.id)} cardUrl={`/post/${post.id}`} postId={post.id} createComment={createComment} deleteComment={deleteComment}/>)}
            </>

        )
    }
    const Card = () => {
        return (
            <>
                <CustomAccordion accordionLegend={"Cliquer ici pour modifier un post"}>
                    <PostForm
                        inputsValue={{ title: post.title, description: post.description, file: post.file }}
                        modifyPost={modifyPost}
                        postId={postId}
                        textButton={'Modifier'}
                        formLegend={'Modifier un post'}
                    />
                </CustomAccordion>
                <CustomCard post={post} deletePost={() => deletePost(post.id)} cardUrl={`/post/${post.id}`} deleteComment={deleteComment} />
            </>
        )
    }
    return (
        <>
            <Typography variant="h1" component='h1' sx={{mb: 3}}>Publier et partager du contenu entre collègues.</Typography>
            {postId && <Card />}
            {!postId && <Cards />}
        </>
    )
}