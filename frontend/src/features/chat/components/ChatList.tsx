import { Box, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import Alert from '../../../components/ui/Alert';


type LastMessageType = {
  _id: string;
  content: string;
  reciever: RecieverType
}

type RecieverType = {
  _id: string;
  username: string;
}

type UserListType = {
  lastMessage: LastMessageType

}

const ChatList = () => {
  const [data, loading, error] = useFetch<UserListType[]>('/chat', [])

  useEffect(() => {
    console.log(data)
  }, [data])

  if (loading) return null
  if(error) return <Alert description={error}/>
  return (
    <Box
      marginTop='5'
      background='white'
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >

      {data.map(currData => (
        <Box
          p={5}
          rounded={5}
          cursor='pointer'
          _hover={{ background: 'lightblue' }}
        >
          <Box >
            <Heading size='md'>
              {currData.lastMessage.reciever.username}
            </Heading>
            <Text pt='2' fontSize='md'>
              {currData.lastMessage.content}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default ChatList