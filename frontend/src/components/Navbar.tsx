import {Form, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
        <NavbarBs 
            expand="lg"  
            className="d-flex justify-content-between shadow-sm ps-3 pt-3 mb-3"
        >
            <NavbarBs.Brand>
                <Form.Control placeholder='Search for people here'/>
            </NavbarBs.Brand>

            <NavbarBs.Brand>
            <Nav.Link>Logout</Nav.Link>
            </NavbarBs.Brand>
        </NavbarBs>
        <Outlet/>
        </>
      );
}

export default Navbar