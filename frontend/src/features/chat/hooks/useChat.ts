import { Dispatch, SetStateAction, useState } from "react"
import { useChatContext } from "../../../contexts/ChatContext"
import { useSocketContext } from "../../../contexts/SocketContext"
import { useAuthContext } from "../../../contexts/AuthContext"

const useChat = () => {
    const { socket } = useSocketContext()
    const { recieverId, chatId } = useChatContext()
    const {id} = useAuthContext()
    const [message,setMessage] = useState('')

    const handleChat = (setData: Dispatch<SetStateAction<any>>) => {
        setMessage('')
        
       
       
        socket?.emit("chat", {
            senderId: id,
            chatId:  chatId,
            message: message,
            recieverId: recieverId
        })

        setData((prev: any) => [...prev,{content: message,sender: id}])
    }

    return { message, handleChat, setMessage }
}

export default useChat