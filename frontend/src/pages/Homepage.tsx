import Chatbox from "../features/chat/components/Chatbox"
import UserList from "../features/chat/components/UserList"

const Homepage = () => {
  return (
    <div className="d-flex">
      <UserList/>
      {/* <Chatbox/> */}
    </div>
  )
}

export default Homepage