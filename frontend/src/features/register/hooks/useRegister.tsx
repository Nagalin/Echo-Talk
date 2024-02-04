import axios from '../../../lib/axios'
import { FormEvent, useRef, useState } from 'react'

const useRegister = () => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [error,setError] = useState('')

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(passwordRef.current?.value !== confirmPasswordRef.current?.value)
            return setError('Password must matched!')

            const formData = new FormData()
            formData.append('username',usernameRef.current?.value!)
            formData.append('password',passwordRef.current?.value!)
            formData.append('img',file!)

        try {
            await axios.post('/register',formData)
            
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
        setFile,
        error
    }
}

export default useRegister