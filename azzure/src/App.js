import './App.css';
import NavbarBasicExample from './navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Sidebar from './sidebar';
import Mainbar from './mainbar';
import { useState } from 'react';


async function getUser() {
    return new Promise(async (resolve, reject) => {
        let user = null;
        if (document.cookie) {
            console.log(document.cookie);
            // get cookie
            const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionCookie='));
            const cookieValue = sessionCookie.split('=')[1];
        
            console.log(cookieValue);
            if (cookieValue) {
                const response = await fetch(`http://localhost:8001/api/users/token/${cookieValue}`);
                if (response.status === 200) {
                    user = await response.json();
                }

                console.log("GOT THIS USER: ", user);
            }
        }
        resolve(user);
    })
}

function App(props) {
    return (
        <>
            <NavbarBasicExample user={props.user} />
            <Container fluid>
                <Row>
                    <Mainbar {...props} />
                </Row>
            </Container>
        </>
    );
}

export { App, getUser };