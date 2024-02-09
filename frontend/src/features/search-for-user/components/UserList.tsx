import { ListGroup } from 'react-bootstrap';
import axios from '../../../lib/axios';
import { useSearchParams } from 'react-router-dom';

type UserlistPropsType = {
  username: string
  id: string
}
const UserList = ({ username, id }: UserlistPropsType) => {
  const [,setSearchParams] = useSearchParams({ chat: '' })
  const handleClick = async (id: string) => {
    const response = await axios.get(`/chat/${id}`)

    setSearchParams(prev => {
      prev.set("chat", response.data._id)
      return prev
    })
  }

  return (
    <ListGroup>
      <ListGroup.Item
        onClick={() => handleClick(id)}
        style={{ cursor: 'pointer' }}
        key={id}
      >
        {username}
      </ListGroup.Item>

    </ListGroup>
  );
}

export default UserList