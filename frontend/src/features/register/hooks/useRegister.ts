import { AxiosError } from "axios"
import { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import registerService from "../services/registerService"

const useRegister = () => {
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const confirmPassword = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File>()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(password.current?.value !== confirmPassword.current?.value)
            return setError('Password must matched !!')

        try {
            const response = await registerService(username.current?.value! , password.current?.value!, image!)
            await Swal.fire({
                title: response.data,
                text: 'Click OK to redirect to login page',
                icon: 'success'
            })
            navigate('/')

            
        } catch (error) {
            console.error(error)
            if(error instanceof AxiosError)
            setError(error.response?.data)
        }
    }

    return {
        username,
        password,
        confirmPassword,
        setImage,
        error,
        handleRegister
    }
}

export default useRegister