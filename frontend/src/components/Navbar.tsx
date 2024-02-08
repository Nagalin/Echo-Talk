import { Dropdown, Nav, NavDropdown, Navbar as NavbarBs } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import Drawer from '../features/search-for-user/components/Drawer';
import { useState } from 'react';

const Navbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <NavbarBs
                expand="lg"
                className="d-flex justify-content-between shadow-sm ps-3 pt-3 mb-3 pe-2"
            >
                <NavbarBs.Brand onClick={handleShow} className='d-flex gap-2 align-items-center' style={{ cursor: 'pointer' }}>
                    <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <path id="search-a" d="M11.7099609,0.572509766 C9.46940104,1.29012044 7.99951172,3.05419922 7.30029297,5.86474609 C6.25146484,10.0805664 4.95166016,10.6181641 0.719970703,9.11865234 C2.23974609,11.9257813 5.32006836,13.0512695 7.30029297,13.0512695 C9.28051758,13.0512695 14.4091797,10.2941895 13.8215332,5.0534668 C13.3114421,3.52709961 12.6075846,2.03344727 11.7099609,0.572509766 Z" />
                            <path id="search-c" d="M14.1791377,12.7701494 L19.7100661,18.3101411 C20.0966446,18.6967197 20.0966446,19.3234875 19.7100661,19.7100661 C19.3234875,20.0966446 18.6967197,20.0966446 18.3101411,19.7100661 L12.7803471,14.1712106 C11.4385246,15.2160226 9.75152329,15.8383427 7.91917136,15.8383427 C3.54553379,15.8383427 0,12.2928089 0,7.91917136 C0,3.54553379 3.54553379,0 7.91917136,0 C12.2928089,0 15.8383427,3.54553379 15.8383427,7.91917136 C15.8383427,9.74688445 15.2191696,11.4299819 14.1791377,12.7701494 Z M7.91917136,13.8585499 C11.1993995,13.8585499 13.8585499,11.1993995 13.8585499,7.91917136 C13.8585499,4.63894318 11.1993995,1.97979284 7.91917136,1.97979284 C4.63894318,1.97979284 1.97979284,4.63894318 1.97979284,7.91917136 C1.97979284,11.1993995 4.63894318,13.8585499 7.91917136,13.8585499 Z" />
                        </defs>
                        <g fill="none" fill-rule="evenodd" transform="translate(2 2)">
                            <g transform="translate(1 2)">
                                <mask id="search-b" fill="#ffffff">
                                    <use xlinkHref="#search-a" />
                                </mask>
                                <use fill="#D8D8D8" xlinkHref="#search-a" />
                                <g fill="#FFA0A0" mask="url(#search-b)">
                                    <rect width="24" height="24" transform="translate(-3 -4)" />
                                </g>
                            </g>
                            <mask id="search-d" fill="#ffffff">
                                <use xlinkHref="#search-c" />
                            </mask>
                            <use fill="#000000" fill-rule="nonzero" xlinkHref="#search-c" />
                            <g fill="#7600FF" mask="url(#search-d)">
                                <rect width="24" height="24" transform="translate(-2 -2)" />
                            </g>
                        </g>
                    </svg>
                    <div>Search for people</div>
                </NavbarBs.Brand>

                <h1>Echo-Talk</h1>

                <NavbarBs.Brand className='d-flex gap-2 align-items-center' style={{ cursor: 'pointer' }}>
                    <div className='d-flex gap-2 align-items-center me-4'>
                        <Dropdown>
                            <Dropdown.Toggle variant=''>
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        <svg onClick={() => alert('click')} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40">
                            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                        </svg>


                    </div>

                    <Nav.Link>Logout</Nav.Link>
                </NavbarBs.Brand>
            </NavbarBs>
            <Drawer handleClose={handleClose} show={show} />
            <Outlet />
        </>
    );
}

export default Navbar