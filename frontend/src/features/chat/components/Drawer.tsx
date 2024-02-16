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

type UserListType = {
    username: string
    _id: string
}

type DrawerPropsType = {
    open: boolean,
    onClose: () => void
}
const Drawer = ({open,onClose}: DrawerPropsType) => {
   
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