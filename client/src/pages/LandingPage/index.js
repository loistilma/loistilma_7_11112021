import React from 'react'
import PostForm from '@layouts/PostForm'
import CustomCard from '@components/Card'
import CustomAccordion from '@components/Accordion'
import usePost from '@services/usePost'
import Typography from '@mui/material/Typography';
import { CommentAction, CommentsList } from '@layouts/Comments'
import useAuth from '@services/useAuth'

export default () => {
    const { posts, deletePost, createPost, createComment, deleteComment } = usePost()
    const { user } = useAuth()
    //console.log(posts)
    const Cards = () => {
        return (
            <>
                <CustomAccordion 
                    label={"Cliquer ici pour rédiger un post"}
                    backgroundColor={'rgba(9, 31, 67, 0.7)'} 
                    textColor={'#FFFFFF'}
                >
                    <PostForm
                        inputsValue={{ title: '', description: '', file: '' }}
                        createPost={createPost}
                    />
                </CustomAccordion>
                {posts.map(post => <CustomCard
                    post={post}
                    key={post.id}
                    deletePost={() => deletePost(post.id)}
                    commentAction={<CommentAction postId={post.id} createComment={createComment} />}
                    commentList={<CommentsList post={post} user={user} deleteComment={deleteComment} />}
                    menuAction
                />
                )}
            </>

        )
    }


    return (
        <>
            <Typography variant="h1" component='h1' sx={{ mb: 3 }}>
                Publier et partager du contenu entre collègues.
            </Typography>
            <Cards />
        </>
    )
}