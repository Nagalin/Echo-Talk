import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type ChatContextType = {
    chatId: string,
    recieverId: string
    setRecieverId: Dispatch<SetStateAction<string>>
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
    const [recieverId,setRecieverId] = useState('')
    return (
        <ChatContext.Provider value={{chatId,recieverId,setChatId,setRecieverId}}>
            {children}
        </ChatContext.Provider>
    )
}