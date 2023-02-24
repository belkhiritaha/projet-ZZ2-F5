import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './navbar.css';

function NavbarBasicExample(props) {


    if (props.user) {
        return (
            <Navbar bg="dark" expand="lg">
                <Container>
                    <div className='logged-header-container'>
                        <div className="logged-logo-container">
                            <img alt="" className="logo" src="https://static.overlay-tech.com/assets/90d2d429-0a9b-4581-b0ae-0b9f027aca29.png" />
                            <p className="title"><a href='/home'>aZZure</a></p>
                        </div>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="link" href="/home">Home</Nav.Link>
                                <Nav.Link className="link" href="/create">Create a VM</Nav.Link>
                                <Nav.Link className="link" href="/cli">Run a CLI</Nav.Link>
                                <Nav.Link className="link" href="/manage">Manage your VMs</Nav.Link>
                                <Nav.Link className="link" href="/dashboard">Dashboard</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                <div className='register'>
                    <Nav.Link href="/logout">
                        <p className='register-text'>Logout</p>
                    </Nav.Link>
                </div>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar bg="dark">
                <Container>
                    <div className='header-container d-flex'>
                        <div className="logo-container">
                            <img alt="" className="logo d-md-block" src="https://static.overlay-tech.com/assets/90d2d429-0a9b-4581-b0ae-0b9f027aca29.png" />
                            <p className="title flex-grow-1"><a href='/home'>aZZure</a></p>
                        </div>
                        <div className="ml-auto">
                            <Nav className="header-links">
                                <div className='register'>
                                    <Nav.Link href="/register">
                                        <p className='register-text d-md-inline'>Register</p>
                                    </Nav.Link>
                                </div>
                                <div className='register'>
                                    <Nav.Link href="/login">
                                        <p className='register-text d-md-inline'>Login</p>
                                    </Nav.Link>
                                </div>
                            </Nav>
                        </div>
                    </div>
                </Container>
            </Navbar>
        );
    }
}

export default NavbarBasicExample;