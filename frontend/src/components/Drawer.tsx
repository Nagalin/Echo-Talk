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
import { useRef, useState } from 'react'


const Drawer = () => {
    const [open, setOpen] = useState(true)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)

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
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                </DrawerContent>
            </ChakrsDrawer>
        </>
    )
}

export default Drawer