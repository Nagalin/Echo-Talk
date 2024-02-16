import useChat from '../hooks/useChat'
import Button from '../../../components/ui/Button'
import { useEffect } from 'react'
import { useSocketContext } from '../../../contexts/SocketContext'
import { Box, Input, Text, VStack } from '@chakra-ui/react'
import useFetch from '../../../hooks/useFetch'
import { useChatContext } from '../../../contexts/ChatContext'
import useFetchChat from '../hooks/useFetchChat'

type ChatType = {
  sender: string,
  reciever: string,
  content: string
}
const ChatBox = () => {
  const {userId} = useChatContext()
  const {message, handleChat} = useChat()
  const {socket} = useSocketContext()

  const [data] = useFetchChat<ChatType[]>('/message',[],userId)

  useEffect(() => {
    console.log(data)
  },[data])

  useEffect(() => {
    socket?.on('chat',payload => console.log(payload))

    return () => {
      socket?.off('chat')

    }
  })
  
  return (
    <form onSubmit={handleChat}>

    <Box className="chat-box">
      <VStack spacing={4} align="stretch">
        <Box className="messages-container">
          <Text textAlign="left" bg="gray.100" p={2} borderRadius="md">
            Dummy message
          </Text>

          <Text textAlign="right" bg="blue.100" p={2} borderRadius="md">
            Dummy message
          </Text>
        </Box>
        <Box className="input-container">
          <Input ref={message} type="text" placeholder="Type your message..." />
          <Button colorScheme="blue" onClick={() => {/* Implement sending message */}}>Send</Button>
        </Box>
      </VStack>
    </Box>
    </form>
  )
}

export default ChatBox