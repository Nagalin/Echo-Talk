import axiosLib from 'axios'

const axios = axiosLib.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
})

export default axios