import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarBasicExample from './navbar';
import './login.css';
import { useState } from 'react';


function Login() {
    let username = '';
    let email = '';
    let password = '';

    const [loading, setLoading] = useState(false);

    function showError(id) {
        document.getElementById(id).classList.add("shake");
        document.getElementById(id).innerHTML = "Error";
        setTimeout(() => {
            document.getElementById(id).classList.remove("shake");
        }
            , 500);

        setTimeout(() => {
            document.getElementById(id).innerHTML = "";
        }
            , 5000);
    }
    
    function handleUsernameChange(event) {
        username = event.target.value;
    }

    function handlePasswordChange(event) {
        password = event.target.value;
    }

    function onsubmit(event) {
        event.preventDefault();
        const user = {
            username: username,
            passwd: password
        };

        setLoading(true);

        fetch('http://localhost:8001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            try {
                const sessionCookie = data.cookie;
                document.cookie = `sessionCookie=${sessionCookie.value}; max-age=86400`;
                window.location.href = 'http://localhost:3000/home';
            }
            catch (error) {
                showError('error');
            }
            finally {
                setLoading(false);
            }
        })
    }

    if (loading) {
        return (
            <>
                <div className='loading-container'>
                    <div className="lds-dual-ring"></div>
                    <div className="loading">Loading...</div>
                    <div className="error" id="error"></div>
                </div>
            </>
        )
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
                    <p id='error' style={{color: "red"}}></p>
                </Form>
            </div>
        </>
    );
}

export default Login;