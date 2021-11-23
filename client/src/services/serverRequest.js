import axios from 'axios'
import { BASE_URL } from '@constants/api'

export const server = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

server.interceptors.request.use(
    config => {
        const { origin } = new URL(BASE_URL)
        const token = localStorage.getItem('token')
        if (origin) {
            config.headers.authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)