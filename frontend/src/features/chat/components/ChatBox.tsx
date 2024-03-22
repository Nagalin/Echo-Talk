import useChat from '../hooks/useChat'
import Button from '../../../components/ui/Button'
import { useEffect } from 'react'
import { useSocketContext } from '../../../contexts/SocketContext'
import { Box, Flex, Input, Text, VStack } from '@chakra-ui/react'
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
  const { message, setMessage, handleChat } = useChat()
  const { socket } = useSocketContext()

  const [data, setData] = useFetchChat<ChatType[]>('/message', [], recieverId)

  useEffect(() => {
    socket?.on('chat', (payload: Test) => {
      console.log(payload)
      if (chatId !== payload.chatId) return

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

  if (!chatId) return (
    <Box flexDirection='column' display='flex' justifyContent='center' w='100vw' alignItems='center'>

      <svg width={100} height={100} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5Z" fill="#1C274C"></path> <path opacity="0.5" d="M15.6361 2.01096C15.0111 2 14.3051 2 13.5 2H10.5C7.22657 2 5.58985 2 4.38751 2.7368C3.71473 3.14908 3.14908 3.71473 2.7368 4.38751C2 5.58985 2 7.22657 2 10.5V11.5C2 13.8297 2 14.9946 2.3806 15.9134C2.88807 17.1386 3.86144 18.1119 5.08658 18.6194C5.74689 18.8929 6.53422 18.9698 7.78958 18.9915C8.63992 19.0061 9.06509 19.0134 9.40279 19.2098C9.74049 19.4063 9.95073 19.7614 10.3712 20.4718L10.9133 21.3877C11.3965 22.204 12.6035 22.204 13.0867 21.3877L13.6288 20.4718C14.0492 19.7614 14.2595 19.4062 14.5972 19.2098C14.9349 19.0134 15.36 19.0061 16.2104 18.9915C17.4658 18.9698 18.2531 18.8929 18.9134 18.6194C20.1386 18.1119 21.1119 17.1386 21.6194 15.9134C22 14.9946 22 13.8297 22 11.5V10.5C22 9.69494 22 8.98889 21.989 8.36394C21.1942 9.07068 20.1473 9.5 19 9.5C16.5147 9.5 14.5 7.48528 14.5 5C14.5 3.85275 14.9293 2.80577 15.6361 2.01096Z" fill="#1C274C">
      </path>
      </g>
      </svg>
      <Text>Start your chat</Text>
    </Box>

  )

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleChat(setData)
    }
    }>
      <Flex justifyContent='space-between'>
        <Box width='800px' >
          <VStack maxHeight='500px' overflow='auto' gap={3} spacing={4} align="stretch">

            {data.map(curr => (
              <Flex justifyContent={curr.sender === id ? 'flex-end' : 'flex-start'}>
                <Text
                  bg={curr.sender === id ? "blue.100" : "gray.100"}
                  p={2} borderRadius="md"
                >
                  {curr.content}
                </Text>
              </Flex>

            ))}


          </VStack>
          <Box
            display='flex'
            marginTop={4}
            flexDirection='column'
            gap={4}

          >

            <Input onChange={e=> setMessage(e.target.value)}   value={message}  type="text" placeholder="Type your message..." />
            <Button marginStart={50} colorScheme="blue" type='submit'>Send</Button>

          </Box>
        </Box>
      </Flex>
    </form>

  )
}

export default ChatBox