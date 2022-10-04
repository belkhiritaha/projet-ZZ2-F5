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
                    <CardItem title="Create a VM" text="Create a customized VM to store and process your IoT data" img="fas fa-cloud-upload-alt" item1="Import a configuration" item2="Create a new configuration" nbFields="2"/>
                    <CardItem title="View my VMs" text="View your existing VMs" img="fas fa-desktop" item1="View 'vm_name1'" item2="View 'vm_name2'" item3="View 'vm_name3'" nbFields="3"/>
                    <CardItem title="Run a Python script" text="Run a Python script on your VM" img="fas fa-terminal" item1="Select a script" item2="Upload a new script" nbFields="2" />
                    <CardItem title="View my Sensors" text="View your existing sensors" img="fas fa-microchip" item1="View 'sensor_name1'" item2="View 'sensor_name2'" item3="View 'sensor_name3'" item4="View 'sensor_name4'" nbFields="4" />
                    <CardItem title="Dashboard" text="Vizualise your IoT data" img="fas fa-chart-line"/>
                </Row>

            </Col>

        </>
    );
}

export default Mainbar;