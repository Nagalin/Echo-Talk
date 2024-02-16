import {
    Alert as ChakraAlert,
    AlertIcon,
    AlertDescription,
} from '@chakra-ui/react'
import{ ReactNode } from 'react';

type AlertPropsType = {
    description: ReactNode
}
const Alert = ({  description }: AlertPropsType) => {
  return (
    <ChakraAlert rounded={5} status='error'>
      <AlertIcon />
      <AlertDescription>{description}</AlertDescription>
    </ChakraAlert>
  )
}

export default Alert
