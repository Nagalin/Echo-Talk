import { Form, Offcanvas } from "react-bootstrap"
import UserList from "./UserList"
import { useEffect, useState } from "react"
import useDebouncedSearch from "../hooks/useDebouncedSearch"

type DrawerPropsType = {
    handleClose: () => void
    show: boolean
}

type UserListType = {
    _id:      string;
    username: string;
}
const Drawer = ({handleClose,show}: DrawerPropsType) => {
  const [searchString,setSearchString] = useState('')
  const result = useDebouncedSearch<UserListType[]>(searchString,[])

  useEffect(() => {
    console.log(result)
  },[result])
  
  return (
    <>
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Form.Control 
            onChange={e => setSearchString(e.target.value)} 
            placeholder='Search for people here'
          />
          </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {
          result.map(currUser => (

            <UserList username={currUser.username} id={currUser._id}/>
          ))

        }
      </Offcanvas.Body>
    </Offcanvas>
  </>
  )
}

export default Drawer