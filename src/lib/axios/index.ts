import axiosInstance from 'axios'

const axios = axiosInstance.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
})

export default axios
