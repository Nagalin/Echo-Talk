import { AxiosError } from 'axios'
import axios from '../../../lib/axios'
import { FormEvent, useRef, useState } from 'react'

const useRegister = () => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [error,setError] = useState('')

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(passwordRef.current?.value !== confirmPasswordRef.current?.value)
            return setError('Password must matched!')

        try {
            await axios.post('/register',{
                username: usernameRef.current?.value,
                password: passwordRef.current?.value
            })
            
        } catch (error: any) {
            console.error(error)
            setError(error.response.data) 
        }
    }

    return {
        usernameRef,
        passwordRef,
        confirmPasswordRef,
        handleRegister,
        error
    }
}

export default useRegister