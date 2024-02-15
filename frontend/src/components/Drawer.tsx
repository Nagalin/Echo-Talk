import {
    Drawer as ChakrsDrawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
} from '@chakra-ui/react'
import Button from './ui/Button'
import { useEffect, useRef, useState } from 'react'
import useDebouncedSearch from '../hooks/useDebouncedSearch'

type UserListType = {
    username: string
    _id: string
}

const Drawer = () => {
    const [open, setOpen] = useState(true)
    const onClose = () => setOpen(false)
    const [searchValue,setSearchValue] = useState('')
    const result = useDebouncedSearch<UserListType[]>('/user',searchValue)

    

    return (
        <>

            <ChakrsDrawer
                isOpen={open}
                placement='left'
                onClose={onClose}

            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input 
                        onChange={e => setSearchValue(e.target.value)} 
                        placeholder='Enter username' 
                    />
                    </DrawerBody>

                </DrawerContent>
            </ChakrsDrawer>
        </>
    )
}

export default Drawer