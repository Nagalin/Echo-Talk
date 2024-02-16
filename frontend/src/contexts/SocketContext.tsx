import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import  { Socket, io } from 'socket.io-client'

type SocketContextType = {
    socket: Socket| undefined
}

type SocketContextPropsType = {
    children: ReactNode
}

const SocketContext = createContext({} as SocketContextType)

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}: SocketContextPropsType) => {
    const [socket,setSocket] = useState<Socket | undefined>(undefined)

  
    useEffect(() => {
        const socket = io('http://localhost:8000')
        setSocket(socket)

        return () => {
            socket.disconnect()
        }
    },[])

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}