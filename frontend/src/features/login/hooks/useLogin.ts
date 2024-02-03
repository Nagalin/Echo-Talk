import axios from '../../../lib/axios'
import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
    const navigate = useNavigate()
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [error,setError] = useState('')

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('/login',{
            username: usernameRef.current?.value,
            password: passwordRef.current?.value
        })
        .then(() => navigate('/homepage'))

        // try {
        //     await axios.post('/login',{
        //         username: usernameRef.current?.value,
        //         password: passwordRef.current?.value
        //     })
        //     navigate('/homepage')
            
        // } catch (error: any) {
        //     console.error(error)
        //     setError(error.response.data) 
        // }
    }

    return {
        usernameRef,
        passwordRef,
        handleLogin,
        error
    }
}

export default useLogin