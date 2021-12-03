import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '@layouts/NavBar'
import Profile from '@layouts/Profile'
import PrivateRoute from '@services/PrivateRoute'
import LoginForm from '@layouts/LoginForm'
import RegisterForm from '@layouts/RegisterForm'
import AuthTabs from '@pages/AuthTabs'
import Landing from '@pages/Landing'

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route element={<AuthTabs />}>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<NavBar />}>
                        <Route path={'/'} element={<Landing />} />
                        <Route path={'/post/:postId'} element={<Landing />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}