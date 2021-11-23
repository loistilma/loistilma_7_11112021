import React, { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '@services/serverRequest'

const UserContext = createContext(null)

function useAuth() {
    const storedJwt = localStorage.getItem('token')
    let navigate = useNavigate()
    const [jwt, setJwt] = useState(storedJwt || null)
    const [error, setError] = useState(null)
    
    //register user
    const registerUser = async (data) => {
        const { username, email, password } = data
        return server.post(`/api/auth/register`, {
            username, email, password
        }).then(res => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    //login user
    const loginUser = async (data) => {
        const { username, password } = data
        return server.post(`/api/auth/login`, {
            username, password
        }).then(res => {
            localStorage.setItem('token', res.data.token)
            setJwt(res.data.token)
            console.log(jwt)
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })
    }

    return {
        jwt,
        registerUser,
        loginUser,
        error
    }
}

export function UserProvider({ children }) {
    const auth = useAuth()
    return (
        <UserContext.Provider value={auth}>
            {children}
        </UserContext.Provider>
    )
}

export default function UserConsumer() {
    return useContext(UserContext)
}