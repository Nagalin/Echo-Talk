import { AxiosError } from "axios"
import axios from "../../../lib/axios"

const registerService = 
async (username: string, password: string , image: File ) => {
    const formData = new FormData()
    formData.append('username',username)
    formData.append('password',password)
    formData.append('image',image!)

    try {
        const response = await axios.post('/register',formData)
        return response
        
    } catch (error) {
        throw error
    }

    


}

export default registerService