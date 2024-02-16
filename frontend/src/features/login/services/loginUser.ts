import { AxiosError } from "axios";
import axios from "../../../lib/axios";
import { useSocketContext } from "../../../contexts/SocketContext";

const loginService = async (username: string | undefined, password: string | undefined) => {
   

    try {
        const response = await axios.post('/login', { username, password });
       
        return response
    } catch (error) {
        throw error
    }
};

export default loginService
