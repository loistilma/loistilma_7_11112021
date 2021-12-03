import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@components/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Menu from '@components/Menu'
import Grid from '@mui/material/Grid'
import { dateISOToFR, nameToInitials } from '@utilities/dataFormatter'
import IconButton from '@mui/material/IconButton';
import useAuth from '@services/useAuth'
import Paper from '@mui/material/Paper'
import AddCommentIcon from '@mui/icons-material/AddComment';
import Dialog from '@components/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

export default function CustomCard({ post, deletePost, cardUrl, deleteComment, createComment, postId }) {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

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
                                    <Avatar aria-label="recipe">
                                        {nameToInitials(post.User.username)}
                                    </Avatar>
                                }
                                action={(user.id === post.UserId || user.isModerator) &&
                                    <Menu
                                        deletePost={deletePost}
                                        cardUrl={cardUrl}
                                    />
                                }
                                title={<Typography variant="h2">{post.title}</Typography>}
                                subheader={isModified(post) + ' par ' + post.User.username}
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                    {post.description}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box>
                            <CardActions disableSpacing>

                                <IconButton onClick={handleClickOpen} aria-label="rédiger commentaire">

                                    <AddCommentIcon sx={{color: '#FD2D01'}}/>
                                    <Typography sx={{p: 1}} variant="body2" color="text.secondary">
                                        Rédiger un commentaire
                                    </Typography>
                                </IconButton>
                            </CardActions>
                        </Box>
                    </Grid>
                    <Dialog open={open} handleClose={handleClose} postId={postId} createComment={createComment} />
                </Grid>
                {post.Comments.length !== 0 &&
                    <Divider>
                        <Chip label="Commentaire" />
                    </Divider>
                }
                {post.Comments.length !== 0 &&
                    <List sx={{ width: '100%' }}>
                        {post.Comments.map((comment, index) =>
                            <ListItem
                                alignItems="flex-start"
                                key={index}
                                divider={index < post.Comments.length - 1}
                                secondaryAction={user.id === comment.UserId &&
                                    <IconButton onClick={() => deleteComment(post.id, comment.id)} aria-label="supprimer commentaire">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={comment.User.username} secondary={comment.content} />
                            </ListItem>
                        )}
                    </List>
                }
            </Paper>
        </>
    )
}