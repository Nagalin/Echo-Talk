import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type AuthContextType = {
    username: string,
    id: string
    setId: Dispatch<SetStateAction<string>>
    setUsername: Dispatch<SetStateAction<string>>
    picName: string
    setPicName: Dispatch<SetStateAction<string>>
}

type AuthContextProviderPropsType = {
    children: ReactNode
}

const AuthContext = createContext({} as AuthContextType)

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}: AuthContextProviderPropsType) => {
    const [username, setUsername] = useState('')
    const [picName,setPicName] = useState('')
    const [id,setId] = useState('')

    return (
        <AuthContext.Provider value={{
            username,
            id,
            setId,
            setUsername,
            picName,
            setPicName
        }}>
            {children}
        </AuthContext.Provider>
    )
}