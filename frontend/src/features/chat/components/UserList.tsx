import { Box } from '@chakra-ui/react';
import accessChatService from '../services/accessChatService';
import { useChatContext } from '../../../contexts/ChatContext';
import { useDrawerContext } from '../../../contexts/DrawerContext';

type UserListPropsType = {
    username: string;
    id: string;
}

const UserList = ({ username, id }: UserListPropsType) => {
    const {setChatId, setRecieverId} = useChatContext()
    const {onClose} = useDrawerContext()

    const handleClick = async () => {
        try {
            const chatId = await accessChatService(id);
            setChatId(chatId);
            setRecieverId(id)
            onClose()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
            p={2}
            border='1px'
            rounded={5}
            borderColor='gray.500'
        >
            {username}
        </Box>
    );
};

export default UserList;
