import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import AddCommentIcon from '@mui/icons-material/AddComment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip'
import CommentDialog from '@components/CommentDialog';

export function CommentAction({ postId, createComment }) {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <>
            <CardActions disableSpacing>
                <IconButton onClick={handleClickOpen} aria-label="rédiger commentaire">
                    <AddCommentIcon sx={{ color: '#FD2D01' }} />
                    <Typography sx={{ p: 1 }} variant="body2" color="text.secondary">
                        Rédiger un commentaire
                    </Typography>
                </IconButton>
            </CardActions>
            <CommentDialog open={open} handleClose={handleClose} postId={postId} createComment={createComment} />
        </>
    )
}
export function CommentsList({ post, user, deleteComment }) {
    return (
        <>
            {post.Comments.length !== 0 &&
                <>
                    <Divider>
                        <Chip label="Commentaire" />
                    </Divider>
                    <List sx={{ width: '100%' }}>
                        {post.Comments.map((comment, index) =>
                            <ListItem
                                alignItems="flex-start"
                                key={index}
                                divider={index < post.Comments.length - 1}
                                secondaryAction={(user.id === comment.UserId || user.isModerator) &&
                                    <IconButton onClick={() => deleteComment(post.id, comment.id)} aria-label="supprimer commentaire">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={comment.User.username} secondary={comment.content} />
                            </ListItem>
                        )}
                    </List>
                </>
            }
        </>
    )
}