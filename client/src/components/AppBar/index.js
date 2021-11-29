import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import useAuth from '@services/useAuth'
import { Link } from 'react-router-dom'
import GroupoLogo from '@assets/images/icon-left-font-monochrome-black.svg'

export default function ButtonAppBar() {
    const { logoutUser } = useAuth()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid sx={{ flexGrow: 1 }}>
                        <Link to='/'>
                            <img src={GroupoLogo} alt={'Logo de grouporama'} width="170" sx={{ flexGrow: 1 }} />
                        </Link>
                    </Grid>
                    <Grid>
                        <Button to='/profile' component={Link} color="inherit">Profile</Button>
                        <Button onClick={logoutUser} color="inherit">Logout</Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
}