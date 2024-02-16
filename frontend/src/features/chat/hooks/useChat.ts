import { Dispatch, FormEvent, SetStateAction, useRef } from "react"
import { useChatContext } from "../../../contexts/ChatContext"
import { useSocketContext } from "../../../contexts/SocketContext"
import { useAuthContext } from "../../../contexts/AuthContext"

const useChat = () => {
    const { socket } = useSocketContext()
    const { recieverId, chatId } = useChatContext()
    const {id} = useAuthContext()
    const message = useRef<HTMLInputElement>(null)

    const handleChat = (setData: Dispatch<SetStateAction<any>>) => {
       
        socket?.emit("chat", {
            senderId: id,
            chatId:  chatId,
            message: message.current?.value,
            recieverId: recieverId
        })

        setData((prev: any) => [...prev,{content: message.current?.value,sender: id}])
    }

    return { message, handleChat }
}

export default useChat