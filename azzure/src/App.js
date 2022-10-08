import './App.css';
import NavbarBasicExample from './navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Sidebar from './sidebar';
import Mainbar from './mainbar';

function App() {
    // return navbar
    return (
        <>
            <NavbarBasicExample />
            <Container fluid>
                <Row>
                    <Sidebar />

                    <Mainbar />
                </Row>
            </Container>
        </>
    );
}

export default App;
