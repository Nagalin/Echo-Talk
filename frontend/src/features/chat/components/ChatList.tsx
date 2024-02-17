import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react'
import useFetch from '../../../hooks/useFetch'
import Alert from '../../../components/ui/Alert';
import { useChatContext } from '../../../contexts/ChatContext';
import accessChatService from '../services/accessChatService';
import { useAuthContext } from '../../../contexts/AuthContext';


type LastMessageType = {
  _id: string;
  content: string;
  reciever: RecieverType
  sender: SenderType
}

type RecieverType = {
  _id: string;
  username: string;
  picName: string
}

type SenderType = {
  _id: string;
  username: string;
  picName: string
}

type UserListType = {
  _id: string
  lastMessage: LastMessageType

}

const ChatList = () => {
  const [data, loading, error] = useFetch<UserListType[]>('/chat', [])
  const { setChatId, setRecieverId } = useChatContext()
  const { picName, username } = useAuthContext()

  const handleClick = async (id: string) => {
    console.log(id)
    try {
      const chatId = await accessChatService(id);
      setChatId(chatId);
      setRecieverId(id)
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) return null
  if (error) return <Alert description={error} />
  
  return (
    <VStack gap={5} h='100vh'background='white'>
      {data.map(currData => (
        <Box
         onClick={()=>handleClick(currData.lastMessage.reciever.username === username ?
          currData.lastMessage.sender._id:
          currData.lastMessage.reciever._id
          )}
          _hover={{ background: 'lightblue' }}
          p={4} cursor='pointer'
          display='flex'
          gap={5}
          alignItems='center'
          minWidth='400'
        >
          <Image
            rounded={5}
            boxSize='60px'
            objectFit='cover'
            src={`http://localhost:8000/${picName}`}
            alt='Dan Abramov'
          />

          <Box maxWidth='200' maxHeight='20' overflow='hidden'>


            <Heading fontSize='xl'>
              {currData.lastMessage.reciever.username === username ?
              currData.lastMessage.sender.username:
              currData.lastMessage.reciever.username
              }
            </Heading>
            <Text fontSize='md'>
              {currData.lastMessage.content}
            </Text>
          </Box>
        </Box>
      ))}
    </VStack>
  )
}

export default ChatList