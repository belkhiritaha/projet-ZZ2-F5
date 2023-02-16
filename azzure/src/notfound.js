import './App.css';
import NavbarBasicExample from './navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Sidebar from './sidebar';

function NotFound(props) {
    // return navbar
    return (
        <>
            <NavbarBasicExample />
            <Container fluid>
                <Row>
                    <Sidebar />

                    <h1>404</h1>
                    <h2>Page not found</h2>
                </Row>
            </Container>
        </>
    );
}

export default NotFound;
