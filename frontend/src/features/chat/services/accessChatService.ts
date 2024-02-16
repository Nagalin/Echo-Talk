import axios from "../../../lib/axios";

const accessChatService = async (id: string) => {
    try {
        const response = await axios.get(`/chat/${id}`);
        return response.data._id; 
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export default accessChatService;
