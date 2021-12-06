import React from 'react'
import PostForm from '@layouts/PostForm'
import CustomCard from '@components/Card'
import CustomAccordion from '@components/Accordion'
import usePost from '@services/usePost'
import Typography from '@mui/material/Typography'

export default () => {
    const { postById, modifyPost } = usePost()
    const post = postById

    const Card = () => {
        return (
            <>
                <CustomAccordion 
                    label={"Cliquer ici pour modifier un post"}
                    backgroundColor={'rgba(169,169,169, 1)'}
                    textColor={'#000000'}
                >
                    <PostForm
                        inputsValue={{ title: post.title, description: post.description, file: post.file }}
                        modifyPost={modifyPost}
                        postId={post.id}
                    />
                </CustomAccordion>
                <CustomCard post={post} />
            </>
        )
    }
    
    return (
        <>
            <Typography variant="h1" component='h1' sx={{mb: 3}}>
                Modifier un partage.
            </Typography>
            <Card />
        </>
    )
}