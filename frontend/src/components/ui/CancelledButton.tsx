import { Button as ChakraButton } from '@chakra-ui/react'
import { ReactNode } from 'react'

type ButtonPropsType = {
    children: ReactNode
}

const CancelledButton = ({children}: ButtonPropsType) => {
  return (
    <ChakraButton type='submit' colorScheme='red'>{children}</ChakraButton>
  )
}

export default CancelledButton