import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './mainbar.css';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import UploadForm, { Switch } from './form';
import './card.css'

function MainbarItem(props) {
    return (
        <Col class={props.class}>
            <a href={props.link}>{props.name}</a>
        </Col>
    );
}

function Mainbar(props) {
    // shown menu state
    const [menu, setMenu] = useState(props.page);

    switch (props.page) {
        case 'home':
            console.log('home');
            // setMenu('home');
            break;
        case 'create':
            console.log('create');
            // setMenu('create');
            break;
        case 'manage':
            console.log('manage');
            // setMenu('manage');
            break;
        default:
            console.log('home');
            setMenu('home');
    }

    const rowContent = [];
    // menu items
    
    
    function CardItem(props) {

        function CustomListGroup(props) {
            const nbItems = props.nbFields;
        
            const items = [];

            function handleListItemClick(i){
                console.log("item"+i);
                window.location.href = props['title'];
            }
        
            for (let i = 1; i <= nbItems; i++) {
                items.push(<ListGroup.Item key={items.length + 1} onClick={handleListItemClick}>{props['item' + i]}</ListGroup.Item>);
            }
            // console.log(items);
            return (
                <ListGroup className="list-group-flush">
                    {items}
                </ListGroup>
            );
        }
        


        function handleCardClick(id) {
            // change props.open to true
            console.log(id);
            //this.setState({open: "true"});
            if (id == 1) {
                setMenu('create');
            }
        }
    
    
        const nbItems = props.nbFields;
    
        return (
            <Card onClick={() => {handleCardClick(props.card_id)}} style={{ width: '18rem', margin: 'auto', textAlign: 'center' }}>
                <i className={props.img} style={{ fontSize: '5rem', margin: 'auto', marginTop: '1rem' }}></i>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.text}</Card.Text>
                </Card.Body>
                <div>{<CustomListGroup {...props} />}</div>
            </Card>
        );
    }
    
    switch (menu) {
        case 'home':
            rowContent.push(<CardItem  style={{ cursor: "pointer"}} key={rowContent.length + 1} card_id='1' title="Create a VM" text="Create a customized VM to store and process your IoT data" img="fas fa-cloud-upload-alt" item1="Import a configuration" item2="Create a new configuration" nbFields="2" open={false}/>);
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='2' title="Manage your VMs" text="Manage your VMs" img="fas fa-desktop" item1="Start a VM" item2="Stop a VM" item3="Delete a VM" nbFields="3"/>);
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='3' title="Run a Python script" text="Run a Python script on your VM" img="fas fa-terminal" item1="Select a script" item2="Upload a new script" nbFields="2" />);
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='4' title="View my Sensors" text="View your existing sensors" img="fas fa-microchip" item1="View 'sensor_name1'" item2="View 'sensor_name2'" item3="View 'sensor_name3'" item4="View 'sensor_name4'" nbFields="4" />);
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='5' title="Dashboard" text="Vizualise your IoT data" img="fas fa-chart-line"/>);
            break;

        case 'create':
            rowContent.push(<CardItem key={rowContent.length + 1} card_id='1' title="Create a VM" text="Create a customized VM to store and process your IoT data" img="fas fa-cloud-upload-alt" item1="Import a configuration" item2="Create a new configuration" nbFields="2" open={true}/>);
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
                    {rowContent}
                </Row>

            </Col>

        </>
    );
}

export default Mainbar;