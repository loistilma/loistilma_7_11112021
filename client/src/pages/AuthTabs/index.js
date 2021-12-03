import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { Outlet, Link, useLocation } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'
import CreateIcon from '@mui/icons-material/Create'
import groupoLogo from '@assets/images/icon-left-font.svg'
import Box from '@mui/material/Box'

function AuthTabs() {
    const location = useLocation()
    /*
    const styles = {
        '&.Mui-selected': {
            color: '#091F43',
            backgroundColor: 'rgba(253, 45, 1, 0.5)',
        },
        '& .MuiTabs-indicator': {
            backgroundColor: '#091F43',
        }
    }
    */
    return (
        <Tabs value={location.pathname} aria-label="Navigation" variant="fullWidth">
            <Tab
                icon={<LockIcon />}
                iconPosition="start"
                value="/login"
                label="Connexion"
                to="/login"
                component={Link}
            />
            <Tab
                icon={<CreateIcon />}
                iconPosition="start"
                value="/register"
                label="Inscription"
                to="/register"
                component={Link}
            />
        </Tabs>
    )
}

export default () => {
    const windowCenter = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    }
    return (
        <>
            <Container maxWidth="sm" sx={windowCenter} component='main'>
                <Box sx={{ px: 10, py: 1 }}>
                    <img src={groupoLogo} alt='Logo de groupomania' width='100%' />
                </Box>
                <Paper elevation={5} sx={{ borderRadius: 4 }}>
                    <AuthTabs />
                    <Outlet />
                </Paper>
            </Container>
        </>
    )
}