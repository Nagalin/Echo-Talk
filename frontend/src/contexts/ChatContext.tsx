import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type ChatContextType = {
    chatId: string,
    userId: string
    setUserId: Dispatch<SetStateAction<string>>
    setChatId: Dispatch<SetStateAction<string>>
}

type ChatContextProviderPropsType = {
    children: ReactNode
}
const ChatContext = createContext({} as ChatContextType)

export const useChatContext = () => {
    return useContext(ChatContext)
}

export const ChatContextProvider = ({children}: ChatContextProviderPropsType)  => {
    const [chatId,setChatId] = useState('')
    const [userId,setUserId] = useState('')
    return (
        <ChatContext.Provider value={{chatId,userId,setChatId,setUserId}}>
            {children}
        </ChatContext.Provider>
    )
}