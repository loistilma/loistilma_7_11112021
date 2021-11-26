import React, { useState, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '@services/serverRequest'
import { useSnackbar } from 'notistack'

const UserContext = createContext(null)

function useAuth() {
    const storedJwt = localStorage.getItem('token')
    const { enqueueSnackbar } = useSnackbar()
    let navigate = useNavigate()
    const [jwt, setJwt] = useState(storedJwt || null)

    //register user
    const registerUser = async (data) => {
        const { username, email, password } = data
        return server.post(`/api/auth/register`, {
            username, email, password
        }).then(res => {
            //console.log(res)
            enqueueSnackbar(res.data.message, { variant: 'success' })
            navigate('/login')
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar(error.res, { variant: 'error' })
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
            enqueueSnackbar(res.data.message, { variant: 'success' })
            navigate('/')
        }).catch((e) => {
            console.log(e.response)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        })
    }

    //logout user
    const logoutUser = () => {
        localStorage.removeItem('token')
        setJwt(null)
        enqueueSnackbar('Vous êtes déconnecté(e)', { variant: 'success' })
        navigate('/login')
    }

    return {
        jwt,
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