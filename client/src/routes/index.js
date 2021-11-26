import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '@layouts/NavBar'
import Profile from '@layouts/Profile'
import PrivateRoute from '@services/PrivateRoute'
import LoginForm from '@layouts/LoginForm'
import RegisterForm from '@layouts/RegisterForm'
import Auth from '@pages/Auth'
import { UserProvider } from '@services/useAuth'
import Landing from '@pages/Landing'

export default function Routers() {
    return (

        <Router>
            <UserProvider>
                <Routes>
                    <Route element={<Auth />}>
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
            </UserProvider>
        </Router>

    )
}

/*
                            <Route path="/" element={<Landing />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/post/:id" element={<Post post={posts.find(p => p.id === match.params.id)}/>} />
*/