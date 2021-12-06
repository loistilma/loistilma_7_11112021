import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '@layouts/NavBar'
import ProfilePage from '@pages/ProfilePage'
import PrivateRoute from '@services/PrivateRoute'
import LoginForm from '@layouts/LoginForm'
import RegisterForm from '@layouts/RegisterForm'
import AuthPage from '@pages/AuthPage'
import LandingPage from '@pages/LandingPage'
import ModifyPage from '@pages/ModifyPage'

export default function Routers() {
    return (

        <Router>
            <Routes>
                <Route element={<AuthPage />}>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<NavBar />}>
                        <Route path={'/'} element={<LandingPage />} />
                        <Route path={'/post/:postId'} element={<ModifyPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>

    )
}