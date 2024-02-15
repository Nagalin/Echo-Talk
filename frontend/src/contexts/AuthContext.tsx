import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type AuthContextType = {
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    picName: string,
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

    return (
        <AuthContext.Provider value={{
            username,
            setUsername,
            picName,
            setPicName
        }}>
            {children}
        </AuthContext.Provider>
    )
}