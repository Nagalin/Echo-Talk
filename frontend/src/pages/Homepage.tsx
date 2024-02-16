import ChatList from '../features/chat/components/ChatList'
import ChatBox from '../features/chat/components/ChatBox'
import { Box } from '@chakra-ui/react'

const Homepage = () => {
  return (
    <Box display='flex'>
    <ChatList/>
    <ChatBox/>
    </Box>
)
}

export default Homepage