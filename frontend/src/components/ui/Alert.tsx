import {
    Alert as ChakraAlert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react';

type AlertPropsType = {
    title: ReactNode
    description: ReactNode
}
const Alert = ({ title, description }: AlertPropsType) => {
  return (
    <ChakraAlert status='error'>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </ChakraAlert>
  )
}

export default Alert
