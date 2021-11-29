import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Menu from '@components/Menu'
import Grid from '@mui/material/Grid'
import { dateISOToFR, nameToInitials } from '@utilities/dataFormatter'
import IconButton from '@mui/material/IconButton';
import useAuth from '@services/useAuth'

export default function CustomCard({ post, handleDelete, cardLink }) {
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
            <Grid container item justifyContent="center" md={6} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {nameToInitials(post.User.username)}
                            </Avatar>
                        }
                        action={(user.id === post.UserId || user.isModerator) &&
                            <Menu
                                handleDelete={handleDelete}
                                cardLink={cardLink}
                            />
                        }
                        title={post.User.username}
                        subheader={isModified(post)}
                    />
                    {post.file &&
                        <CardMedia
                            component="img"
                            height="194"
                            image={post.file}
                            alt={`Ìmage publiée par ${post.User.username}`}
                        />
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}