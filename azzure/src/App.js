import './App.css';
import NavbarBasicExample from './navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Mainbar from './mainbar';


async function getUser() {
    return new Promise(async (resolve, reject) => {
        let user = null;
        if (document.cookie) {
            // get cookie
            const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionCookie='));
            const cookieValue = sessionCookie.split('=')[1];
        
            if (cookieValue) {
                const response = await fetch(`http://localhost:8001/api/users/token/${cookieValue}`);
                if (response.status === 200) {
                    user = await response.json();
                }
            }
            resolve(user);
        }
        else {
            reject();
        }
    })
}

async function getVmStatus(user, vmId) {
    return new Promise((resolve, reject) => {
        // get cookie
        if (document.cookie) {
            // get cookie
            const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionCookie='));
            const cookieValue = sessionCookie.split('=')[1];
            fetch(`http://localhost:8001/api/users/${user.id}/vms/${vmId}/status`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${cookieValue}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    })
}


async function getAllVMs(user) {
    return new Promise((resolve, reject) => {
        // get cookie
        if (document.cookie) {
            // get cookie
            const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionCookie='));
            const cookieValue = sessionCookie.split('=')[1];
            fetch(`http://localhost:8001/api/users/${user.id}/vms`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${cookieValue}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
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

export { App, getUser, getAllVMs,getVmStatus};