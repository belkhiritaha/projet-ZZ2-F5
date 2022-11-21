import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarBasicExample from './navbar';
import './login.css';

function Login() {
    let username = '';
    let email = '';
    let password = '';
    
    function handleUsernameChange(event) {
        username = event.target.value;
        console.log(username);
    }

    function handlePasswordChange(event) {
        password = event.target.value;
        console.log(password);
    }

    function onsubmit(event) {
        event.preventDefault();
        console.log('submit');
    }

    return (
        <>
            <NavbarBasicExample />
            <div className='container'>
                <h2>Login</h2>
                <Form onSubmit={onsubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Enter username :</Form.Label>
                        <Form.Control type="text" placeholder="Username..." onChange={handleUsernameChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Enter password :</Form.Label>
                        <Form.Control type="password" placeholder="******" onChange={handlePasswordChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Login;