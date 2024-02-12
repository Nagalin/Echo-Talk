import { Button as ChakraButton } from '@chakra-ui/react'
import { ReactNode } from 'react'

type ButtonPropsType = {
    children: ReactNode
}

const Button = ({children}: ButtonPropsType) => {
  return (
    <ChakraButton type='submit' colorScheme='blue'>{children}</ChakraButton>
  )
}

export default Button