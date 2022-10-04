import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import CardItem from './card';
import './mainbar.css';

function MainbarItem(props) {
    return (
        <Col class={props.class}>
            <a href={props.link}>{props.name}</a>
        </Col>
    );
}

function Mainbar() {
    return (
        <>
            <Col xs={10}>
                <Container style={{ textAlign: "center" }}>
                    <h1>aZZure</h1>
                    <h2>Clermont INP's IoT VM Manager</h2>
                </Container>
                <Row>
                    <CardItem title="Create a VM" text="Create a customized VM to process your IoT data" />
                    <CardItem title="View my VMs" text="View your existing VMs" />
                    <CardItem title="Dashboard" text="Vizualise your IoT data" />
                </Row>

            </Col>

        </>
    );
}

export default Mainbar;