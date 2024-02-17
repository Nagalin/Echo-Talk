import {
    Drawer as ChakrsDrawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Box,
} from '@chakra-ui/react'
import {  useState } from 'react'
import useDebouncedSearch from '../../../hooks/useDebouncedSearch'
import UserList from './UserList'
import { useDrawerContext } from '../../../contexts/DrawerContext'

type UserListType = {
    username: string
    _id: string
}


const Drawer = () => {
    const {open, onClose} = useDrawerContext()
   
    const [searchValue, setSearchValue] = useState('')
    const result = useDebouncedSearch<UserListType[]>('/user', searchValue)

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
                    <DrawerHeader marginTop={8}> <Input
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder='Enter username'
                    /></DrawerHeader>

                    <DrawerBody>
                        <Box display='flex' flexDirection='column' mt={10} gap={3}>
                            {result?.map(curr => (

                                <UserList username={curr.username} id={curr._id} />

                            ))}
                        </Box>
                    </DrawerBody>

                </DrawerContent>
            </ChakrsDrawer>
        </>
    )
}

export default Drawer