import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './navbar.css';

function NavbarBasicExample(props) {


    if (props.user) {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">aZZure</Navbar.Brand>
                    <Navbar.Brand>Welcome, {props.user.username}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/create">Create a VM</Nav.Link>
                            <Nav.Link href="/manage">Manage your VMs</Nav.Link>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <div className='header-container'>
                        <div className="logo-container">
                            <img alt="" className="logo" src="https://static.overlay-tech.com/assets/90d2d429-0a9b-4581-b0ae-0b9f027aca29.png" />
                            <p className="title"><a href='/home'>aZZure</a></p>
                        </div>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto header-links">
                                <div className='register'>
                                    <Nav.Link href="/register">
                                        <p className='register-text'>Register</p>
                                    </Nav.Link>
                                </div>
                                <div className='register'>
                                    <Nav.Link href="/login">
                                        <p className='register-text'>Login</p>
                                    </Nav.Link>
                                </div>
                            </Nav>
                        </Navbar.Collapse>    
                    </div>
                </Container>
            </Navbar>
        );
    }
}

export default NavbarBasicExample;