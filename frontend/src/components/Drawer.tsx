import { Form, Offcanvas } from "react-bootstrap"
import UserList from "./UserList"

type DrawerPropsType = {
    handleClose: () => void
    show: boolean
}

const Drawer = ({handleClose,show}: DrawerPropsType) => {
  return (
    <>
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title><Form.Control placeholder='Search for people here'/></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <UserList/>
      </Offcanvas.Body>
    </Offcanvas>
  </>
  )
}

export default Drawer