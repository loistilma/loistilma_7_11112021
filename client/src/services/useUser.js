import { server } from '@services/axiosServerInstance'
import useAuth from '@services/useAuth'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'

export default function useUser() {
    const { user, logoutUser } = useAuth()
    const [userData, setUserData] = useState([])
    const { enqueueSnackbar } = useSnackbar()

    useEffect(async () => {
        getUser()
    }, [])

    // get User
    const getUser = async () => {
        try {
            const res = await server.get(`/api/users/${user.id}`)
            setUserData(res.data)
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
        //console.log(res.data)
    }
    
    // delete User
    const deleteUser = async () => {
        try {
            await server.delete(`/api/users/${user.id}`)
            await logoutUser()
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
    }

    return {
        userData,
        deleteUser,
    }
}