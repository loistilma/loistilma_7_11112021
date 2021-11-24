import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '@services/useAuth'

export default function PrivateRoute(){
    const { jwt } = useAuth()
    //console.log(jwt)
    return jwt ? <Outlet /> : <Navigate to="/login" />
}
