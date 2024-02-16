import useChat from '../hooks/useChat'
import Button from '../../../components/ui/Button'
import { useEffect } from 'react'
import { useSocketContext } from '../../../contexts/SocketContext'
import { Box, Input, Text, VStack } from '@chakra-ui/react'
import { useChatContext } from '../../../contexts/ChatContext'
import useFetchChat from '../hooks/useFetchChat'
import { useAuthContext } from '../../../contexts/AuthContext'

type ChatType = {
  sender: string,
  reciever?: string,
  chatId: string
  content: string
}

type Test = {
  senderId: string,
  recieverId?: string,
  chatId: string
  message: string
}
const ChatBox = () => {
  const { recieverId, chatId } = useChatContext()
  const { id } = useAuthContext()
  const { message, handleChat } = useChat()
  const { socket } = useSocketContext()

  const [data, setData] = useFetchChat<ChatType[]>('/message', [], recieverId)

 

  useEffect(() => {
    socket?.on('chat', (payload: Test) => {
      console.log(payload)
      if(chatId !== payload.chatId) return

      setData(prev => [
        ...prev,
        {
          sender: payload.senderId,
          reciever: payload.recieverId,
          chatId: payload.chatId,
          content: payload.message
        }
      ])
            
    })

    return () => {
      socket?.off('chat')

    }
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleChat(setData)
    }
    }>

      <Box className="chat-box">
        <VStack spacing={4} align="stretch">
          <Box className="messages-container">
            {data.map(curr => (
              <>
                {curr.sender === id ?

                  <Text textAlign="right" bg="blue.100" p={2} borderRadius="md">
                    {curr.content}
                  </Text> :
                  <Text textAlign="left" bg="gray.100" p={2} borderRadius="md">
                    {curr.content}
                  </Text>
                }


              </>
            ))}
          </Box>
          <Box className="input-container">
            <Input ref={message} type="text" placeholder="Type your message..." />
            <Button colorScheme="blue" onClick={() => {/* Implement sending message */ }}>Send</Button>
          </Box>
        </VStack>
      </Box>
    </form>
  )
}

export default ChatBox