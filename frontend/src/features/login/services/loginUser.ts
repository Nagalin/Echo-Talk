import { AxiosError } from "axios";
import axios from "../../../lib/axios";

export const loginUser = async (username: string | undefined, password: string | undefined) => {
    try {
        const response = await axios.post('/login', { username, password });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err.response?.data;
    }
};
