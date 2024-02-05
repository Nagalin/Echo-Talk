import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});

axios.interceptors.response.use(response => response, async (err) =>{
    const originalRequest = err.config
    if (originalRequest.status === 403 || !originalRequest._retry){
        originalRequest._retry = true
        try {
            await axios.get('refresh-token')
            return axios(originalRequest)
        } catch (error) {
            console.error(error)
            return Promise.reject()
            
        }
    }
})



export default axios