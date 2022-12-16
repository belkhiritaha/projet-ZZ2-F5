import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarBasicExample from './navbar';

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
            <div style={{ width: '50%', margin: 'auto', marginTop: '5%' }} className="container">
                <h1>Register</h1>
                <Form onSubmit={onsubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" onChange={handleUsernameChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Stay Signed In" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Register;