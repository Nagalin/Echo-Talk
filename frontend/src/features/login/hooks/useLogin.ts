import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from '../services/loginUser';
import { AxiosError } from "axios";

const useLogin = () => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await loginService(username.current?.value , password.current?.value);
            navigate('/homepage');
        } catch (error) {
            console.error(error)
            if(error instanceof AxiosError)
            setError(error.response?.data)
        }
    };

    return {
        username,
        password,
        error,
        handleLogin
    };
};

export default useLogin;
