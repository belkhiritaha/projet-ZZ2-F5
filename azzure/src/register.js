import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarBasicExample from './navbar';
import './login.css';
import './register.css';

function Register() {
    let username = '';
    let email = '';
    let password = '';

    function handleUsernameChange(event) {
        username = event.target.value;
        console.log(username);
    }

    function handleEmailChange(event) {
        email = event.target.value;
        console.log(email);
    }

    function handlePasswordChange(event) {
        password = event.target.value;
        console.log(password);
    }

    function onsubmit(event) {
        event.preventDefault();
        // create user object
        const user = {
            username: username,
            email: email,
            passwd: password,
            listVMs: []
        };

        // send post request to port 8001
        fetch('http://localhost:8001/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => console.log(response));
    }


    return (
        <>
            <NavbarBasicExample />
            <div className="login-container">
                <h2>Register</h2>
                <Form className='login-body' onSubmit={onsubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label className='login-text'>Enter username :</Form.Label>
                        <Form.Control className='name-register' type="username" placeholder="Username..." onChange={handleUsernameChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='login-text'>Enter email address :</Form.Label>
                        <Form.Control className='name-register' type="email" placeholder="Email" onChange={handleEmailChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='login-text'>Enter password :</Form.Label>
                        <Form.Control className='name-register' type="password" placeholder="********" onChange={handlePasswordChange}/>
                        <Form.Text id="passwordHelpBlock" muted>
                            <br />Your password must be at least 8 characters long, contain at least one uppercase letter
                            and al least one number numbers.
                        </Form.Text>
                    </Form.Group>

                    <Button className='submit-button' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Register;