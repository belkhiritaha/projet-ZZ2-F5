import logo from './logo.svg';
import './App.css';
import BasicExample from './navbar';
import Container from 'react-bootstrap/Container';

function App() {
    // return navbar
    return (
        <>
            <BasicExample />
            <Container>
                <h1>Test</h1>
            </Container>
        </>
    );
}

export default App;
