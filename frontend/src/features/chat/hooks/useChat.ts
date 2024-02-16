import { FormEvent, useRef } from "react"
import { useChatContext } from "../../../contexts/ChatContext"
import { useSocketContext } from "../../../contexts/SocketContext"
import { useAuthContext } from "../../../contexts/AuthContext"

const useChat = () => {
    const { socket } = useSocketContext()
    const { userId } = useChatContext()
    const {id} = useAuthContext()
    const message = useRef<HTMLInputElement>(null)

    const handleChat = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        socket?.emit("chat", {
            senderId: id,
            message: message.current?.value,
            recieverId: userId
        })
    }

    return { message, handleChat }
}

export default useChat