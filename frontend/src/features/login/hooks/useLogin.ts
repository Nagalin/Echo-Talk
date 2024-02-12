import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/loginUser';

const useLogin = () => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await loginUser(username.current?.value , password.current?.value);
            navigate('/homepage');
        } catch (error: any) {
            console.error(error);
            setError(error);
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
