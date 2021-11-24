import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { Outlet, Link, useLocation } from 'react-router-dom'

function AuthTabs() {
    const location = useLocation()
    return (
        <Tabs value={location.pathname} aria-label="Navigation">
            <Tab
                value="/login"
                label="Login" 
                to="/login" 
                component={Link} 
            />
            <Tab 
                value="/register"
                label="Register" 
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
            <Container maxWidth="sm" sx={windowCenter}>
                <Paper elevation={15}>
                    <AuthTabs />
                    <Outlet />
                </Paper>
            </Container>
        </>
    )
}