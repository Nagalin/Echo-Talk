import { Button as ChakraButton ,ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'


const Button = ({children,onClick}: ButtonProps) => {
  return (
    <ChakraButton onClick={onClick} type='submit' colorScheme='blue'>
      {children}
    </ChakraButton>
  )
}

export default Button