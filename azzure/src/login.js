import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarBasicExample from './navbar';
import './login.css';

function Login() {
  return (
    <>
        <NavbarBasicExample />
        <div className='container'>
            <h2>Login</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Enter username :</Form.Label>
                    <Form.Control type="text" placeholder="Username..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter password :</Form.Label>
                    <Form.Control type="password" placeholder="******" />
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