import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import useAuth from '@services/useAuth'
import { Link } from 'react-router-dom'
import GroupoLogo from '@assets/images/icon-left-font-monochrome-black.svg'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { Typography } from '@mui/material'

export default function CustomAppBar() {
    const { logoutUser } = useAuth()
    const hideTextOnSm = {
        display: {
            xs: 'none', sm: 'inline'
        },
        letterSpacing: '0.050em',
        fontWeight: 600, p: 1
    }
    const borderRadius = {
        borderRadius: 2,
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgba(253, 45, 1, 0.5)' }}>
            <Container maxWidth="md" component='nav'>
                <Toolbar disableGutters>
                    <Grid sx={{ flexGrow: 1 }}>
                        <IconButton
                            sx={borderRadius}
                            size="large"
                            aria-label="Lien page accueil"
                            color="inherit"
                            to='/'
                            component={Link}
                        >
                            <img src={GroupoLogo} alt={'Logo de grouporama'} width="170" />
                        </IconButton>
                    </Grid>
                    <Grid>
                        <IconButton
                            sx={borderRadius}
                            size="large"
                            aria-label="Lien page profil"
                            color="inherit"
                            to='/profile'
                            component={Link}
                        >
                            <PersonIcon />
                            <Typography
                                sx={hideTextOnSm}
                                color="inherit"
                            >
                                Profile
                            </Typography>

                        </IconButton>
                        <IconButton
                            sx={borderRadius}
                            size="large"
                            aria-label="Boutton d??connexion"
                            color="inherit"
                            onClick={logoutUser}
                        >
                            <LogoutIcon />
                            <Typography
                                sx={hideTextOnSm}
                                color="inherit"
                            >
                                D??connexion
                            </Typography>
                        </IconButton>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}