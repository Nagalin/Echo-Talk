import { Box, Heading, Text } from '@chakra-ui/react'


const ChatList = () => {
  return (
    <Box marginTop='5' background='white' display='flex' flexDirection='column' >

      <Box p={5} rounded={5}  cursor='pointer' _hover={{ background: 'lightblue' }}>
        <Box >
          <Heading size='md'>
            John Doe
          </Heading>
          <Text pt='2' fontSize='md'>
            hey brooo
          </Text>
        </Box>
      </Box>

      <Box>


        <Box  p={5} rounded={5}  cursor='pointer' _hover={{ background: 'lightblue' }}>
          <Heading size='md'>
            John Doe
          </Heading>
          <Text pt='2' fontSize='md'>
            hey brooo
          </Text>
        </Box>
      </Box>
    </Box>

  )
}

export default ChatList