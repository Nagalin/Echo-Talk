import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from '../services/loginUser';
import { AxiosError } from "axios";
import { useSocketContext } from "../../../contexts/SocketContext";

const useLogin = () => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const{socket} = useSocketContext()
    const socketHandshake = (id: string) => {
        socket?.emit('handshake',id)
     
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await loginService(username.current?.value , password.current?.value);
            socketHandshake(username.current?.value!);
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
