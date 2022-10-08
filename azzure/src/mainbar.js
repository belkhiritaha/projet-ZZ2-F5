import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import CardItem from './card';
import { Collapse } from 'react-bootstrap';
import './mainbar.css';

function MainbarItem(props) {
    return (
        <Col class={props.class}>
            <a href={props.link}>{props.name}</a>
        </Col>
    );
}

function Mainbar() {
    // shown menu state
    const [menu, setMenu] = useState('home');

    const rowContent = [];
    // menu items
    switch (menu) {
        case 'home':
            rowContent.push(<CardItem onHover={() => {console.log("create")}} style={{ cursor: "pointer"}} key={rowContent.length + 1} card_id='1' title="Create a VM" text="Create a customized VM to store and process your IoT data" img="fas fa-cloud-upload-alt" item1="Import a configuration" item2="Create a new configuration" nbFields="2"/>);
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='2' title="Manage your VMs" text="Manage your VMs" img="fas fa-desktop" item1="Start a VM" item2="Stop a VM" item3="Delete a VM" nbFields="3"/>);
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='1' title="Run a Python script" text="Run a Python script on your VM" img="fas fa-terminal" item1="Select a script" item2="Upload a new script" nbFields="2" />);
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='1' title="View my Sensors" text="View your existing sensors" img="fas fa-microchip" item1="View 'sensor_name1'" item2="View 'sensor_name2'" item3="View 'sensor_name3'" item4="View 'sensor_name4'" nbFields="4" />);
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='1' title="Dashboard" text="Vizualise your IoT data" img="fas fa-chart-line"/>);
            break;

        case 'create':
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='1' title="Create a VM" text="Create a customized VM to store and process your IoT data" img="fas fa-cloud-upload-alt" item1="Import a configuration" item2="Create a new configuration" nbFields="2"/>);
            break;
    
        default:
            break;
    }

    return (
        <>
            <Col xs={10}>
                <Container style={{ textAlign: "center" }}>
                    <h1>aZZure</h1>
                    <h2>Clermont INP's IoT VM Manager</h2>
                </Container>

                <Row>
                    <CardItem tag="a" onClick={() => {console.log("create")}} style={{ cursor: "pointer"}} key={rowContent.length + 1} card_id='1' title="Create a VM" text="Create a customized VM to store and process your IoT data" img="fas fa-cloud-upload-alt" item1="Import a configuration" item2="Create a new configuration" nbFields="2"/>

                    {rowContent}
                </Row>

            </Col>

        </>
    );
}

export default Mainbar;