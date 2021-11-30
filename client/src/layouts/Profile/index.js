import React, { useState, useEffect } from 'react'
import { server } from '@services/serverRequest'
import useAuth from '@services/useAuth'
import Button from '@components/Button'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default () => {
    const [data, setData] = useState([])
    const { user, logoutUser } = useAuth()
    useEffect(async () => {
        const res = await server.get(`/api/users/${user.id}`)
        setData(res.data)
    }, [])
    const handleClick = async () => {
        const res = await server.delete(`/api/users/${user.id}`)
        await logoutUser()
        console.log(res.data)
    }
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Username" secondary={data.username} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <EmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={data.email} />
                </ListItem>
            </List>
            <Button onClick={handleClick}>Supprimer le compte</Button>
        </>
    )
}