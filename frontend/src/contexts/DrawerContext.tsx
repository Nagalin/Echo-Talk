import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import Drawer from "../features/chat/components/Drawer";

type DrawerContextType = {
    open: boolean,
    onClose: () => void
    setOpen: Dispatch<SetStateAction<boolean>>
}

type DrawerContextProviderPropsType = {
    children: ReactNode
}

const DrawerContext = createContext({} as DrawerContextType)

export const useDrawerContext = () => {
    return useContext(DrawerContext)
}

export const DrawerContextProvider = ({children}: DrawerContextProviderPropsType) => {
    const [open, setOpen] = useState(false)
    const onClose = () => setOpen(false)

    return (
        <DrawerContext.Provider value={{open,onClose, setOpen}}>
            <Drawer />
            {children}
        </DrawerContext.Provider>
    )
}