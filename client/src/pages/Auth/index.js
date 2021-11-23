import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { Outlet, Link } from 'react-router-dom'

function AuthTabs() {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <Tabs value={value} onChange={handleChange} aria-label="Navigation">
            <Tab 
                label="Login" 
                to="/login" 
                component={Link} 
            />
            <Tab 
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