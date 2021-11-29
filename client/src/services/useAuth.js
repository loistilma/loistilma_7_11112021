import React, { useState, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '@services/serverRequest'
import { useSnackbar } from 'notistack'

const UserContext = createContext(null)

function useAuth() {
    const storedJwt = localStorage.getItem('token')
    const currentUser = localStorage.getItem('user')
    const [jwt, setJwt] = useState(storedJwt || null)
    const [user, setUser] = useState(JSON.parse(currentUser) || null)
    const { enqueueSnackbar } = useSnackbar()
    let navigate = useNavigate()
    
    //register user
    const registerUser = async (data) => {
        const { username, email, password } = data
        try {
            const res = await server.post(`/api/auth/register`, { username, email, password })
            //console.log(res)
            enqueueSnackbar(res.data.message, { variant: 'success' })
            navigate('/login')
        } catch (error) {
            console.log(error)
            enqueueSnackbar(error.res, { variant: 'error' })
        }
    }

    //login user
    const loginUser = async (data) => {
        const { username, password } = data
        try {
            const res = await server.post(`/api/auth/login`, { username, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify({ id: res.data.user, isModerator: res.data.isModerator }))
            setJwt(res.data.token)
            setUser({ id: res.data.user, isModerator: res.data.isModerator })
            enqueueSnackbar(res.data.message, { variant: 'success' })
            navigate('/')
        } catch (e) {
            console.log(e.response)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
    }

    //logout user
    const logoutUser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setJwt(null)
        setUser(null)
        enqueueSnackbar('Vous êtes déconnecté(e)', { variant: 'success' })
        navigate('/login')
    }

    return {
        jwt,
        user,
        registerUser,
        loginUser,
        logoutUser
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