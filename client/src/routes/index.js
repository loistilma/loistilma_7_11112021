import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@layouts/Home'
import Profile from '@layouts/Profile'
import PrivateRoute from '@services/PrivateRoute'
import Login from '@layouts/Login'
import Register from '@layouts/Register'
import Auth from '@pages/Auth'
import { UserProvider } from '@services/useAuth'

export default function Routers() {
    return (

        <Router>
            <UserProvider> 
            <Routes>
                <Route element={<Auth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
            </UserProvider>
        </Router>

    )
}