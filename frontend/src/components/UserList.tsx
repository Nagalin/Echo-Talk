import { Box } from '@chakra-ui/react'
import React from 'react'

type UserListPropsType = {
    username: string,
    id: string
}
const UserList = ({username, id}: UserListPropsType) => {
  return (
    <Box style={{cursor: 'pointer'}} p={2} border='1px' rounded={5} borderColor='gray.500'>{username}</Box>
  )
}

export default UserList