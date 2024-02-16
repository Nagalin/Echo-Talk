import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import useChat from '../hooks/useChat'
import Button from '../../../components/ui/Button'
import { useEffect } from 'react'
import { useSocketContext } from '../../../contexts/SocketContext'

const ChatBox = () => {
  const {message, handleChat} = useChat()
  const {socket} = useSocketContext()

  useEffect(() => {
    socket?.on('chat',payload => console.log(payload))

    return () => {
      socket?.off('chat')

    }
  })
  
  return (
    <form onSubmit={handleChat}>

    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input ref={message} type='email' />
      <FormHelperText>We'll never share your email.</FormHelperText>
      <Button>Send message</Button>
    </FormControl>
    </form>
  )
}

export default ChatBox