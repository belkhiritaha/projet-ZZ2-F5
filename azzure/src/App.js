import './App.css';
import NavbarBasicExample from './navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Sidebar from './sidebar';
import Mainbar from './mainbar';
import { useState } from 'react';

function App(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        return new Promise(async (resolve, reject) => {
            let username = null;
            if (document.cookie) {
                console.log(document.cookie);
                // get cookie
                const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionCookie='));
                const cookieValue = sessionCookie.split('=')[1];
            
                console.log(cookieValue);
                if (cookieValue) {
                    // request to /api/user/cookie/:cookie
                    const response = await fetch(`http://localhost:8001/api/user/cookie/${cookieValue}`);
                    if (response.status === 200) {
                        username = response.text();
                    }

                    console.log(username);
                }
            }
            resolve(username);
        })
    }

    const username = getUser().then(username => {
        setUser(username);
        setLoading(false);
    });

    if (loading) {
        return (
            <div className="lds-dual-ring"></div>
        )
    }

    return (
        <>
            <NavbarBasicExample user={user} />
            <Container fluid>
                <Row>
                    <Mainbar {...props} />
                </Row>
            </Container>
        </>
    );
}

export default App;
