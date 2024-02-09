import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import  { Socket } from 'socket.io-client'

type SocketContextType = {
    socket: Socket | undefined,
    setSocket: Dispatch<SetStateAction<Socket | undefined>>
}

type SocketContextProviderProps = {
    children: ReactNode
}

const SocketContext = createContext({} as SocketContextType)

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}: SocketContextProviderProps) => {
    const [socket,setSocket] = useState<Socket>();

    return (
        <SocketContext.Provider value={{socket,setSocket}}>
            {children}

        </SocketContext.Provider>

    )
}