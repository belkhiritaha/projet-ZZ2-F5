import './App.css';
import NavbarBasicExample from './navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Sidebar from './sidebar';
import Mainbar from './mainbar';

function App(props) {
    // return navbar
    return (
        <>
            <NavbarBasicExample />
            <Container fluid>
                <Row>
                    <Sidebar />

                    <Mainbar {...props} />
                </Row>
            </Container>
        </>
    );
}

export default App;
