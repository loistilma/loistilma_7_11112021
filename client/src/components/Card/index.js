import React from 'react';
import Avatar from '@components/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Menu from '@components/Menu'
import Grid from '@mui/material/Grid'
import { dateISOToFR } from '@utilities/dataFormatter'
import useAuth from '@services/useAuth'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function CustomCard({ post, deletePost, commentAction, commentList, menuAction }) {
    const { user } = useAuth()

    const isModified = (post) => {
        if (post.createdAt !== post.updatedAt) {
            return `Modifié le ${dateISOToFR(post.updatedAt)}`
        } else {
            return `Publié le ${dateISOToFR(post.createdAt)}`
        }
    }

    return (
        <>
            <Paper elevation={10} sx={{ my: 4, borderRadius: 2 }}>
                <Grid container>
                    {post.file &&
                        <Grid item sm={6}>
                            <Box m={2}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={post.file}
                                    alt={`Ìmage publiée par ${post.User.username}`}
                                    sx={{ borderRadius: 3 }}
                                />
                            </Box>
                        </Grid>
                    }

                    <Grid item sm={post.file && 6} container direction="column" justifyContent="space-between" wrap="nowrap">
                        <Box>
                            <CardHeader
                                avatar={
                                    <Avatar text={post.User?.username} aria-label="recipe" />
                                }
                                action={(menuAction && (user.id === post.UserId || user.isModerator)) &&
                                    <Menu
                                        deletePost={deletePost}
                                        postId={post.id}
                                    />
                                }
                                title={<Typography variant="h2">{post.title}</Typography>}
                                subheader={isModified(post) + ' par ' + post.User?.username}
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                    {post.description}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box>
                            {commentAction}
                        </Box>
                    </Grid>
                </Grid>
                {commentList}
            </Paper>
        </>
    )
}