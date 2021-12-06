import React from 'react'
import Button from '@components/Button'
import Typography from '@mui/material/Typography';
import useUser from '@services/useUser';
import UserInfo from '@layouts/UserInfo';

export default () => {
    const { userData, deleteUser } = useUser()
    const handleClick = () => {
        deleteUser()
    }

    return (
        <>
            <Typography variant="h1" component='h1' sx={{ mb: 3 }}>Informations</Typography>
            <UserInfo userData={userData} />
            <Button onClick={handleClick}>Supprimer le compte</Button>
        </>
    )
}