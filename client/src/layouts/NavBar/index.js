import React from 'react'
import AppBar from '@components/AppBar'
import { Outlet } from 'react-router'
import Container from '@mui/material/Container'

export default () => {
    return (
        <>
            <AppBar />
            <Container maxWidth="md" component="main" sx={{ my: 4 }}>
                <Outlet />
            </Container>
        </>
    )
}