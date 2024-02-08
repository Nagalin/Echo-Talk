import { ListGroup } from 'react-bootstrap';

type UserlistPropsType = {
  username: string
  id: string
}
const UserList = ({username, id}: UserlistPropsType) => {
    return (
        <ListGroup>
          <ListGroup.Item style={{cursor: 'pointer'}} key={id}>
            {username}
          </ListGroup.Item>
         
        </ListGroup>
      );
}

export default UserList