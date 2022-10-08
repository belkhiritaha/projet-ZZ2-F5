import React, { useState, useTransition } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './mainbar.css';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import UploadForm, { Switch } from './form';
import Fade from 'react-bootstrap/Fade';
import './card.css'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

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

        function handleCardClick(id) {
            // change props.open to true
            console.log(id);
            console.log(menu);
            //this.setState({open: "true"});
            if (menu !== "home") {
                setMenu("home");
            }
            else {
                if (id == 1) {
                    setMenu('create');
                }
                else if (id == 2) {
                    setMenu('manage');
                }
                else if (id == 3) {
                    setMenu('run');
                }
                else if (id == 4) {
                    setMenu('view');
                }
                else if (id == 5) {
                    setMenu('dashboard');
                }
            }
        }


        const nbItems = props.nbFields;

        return (
            <Card onClick={() => { handleCardClick(props.card_id) }} style={{ width: '18rem', margin: 'auto', textAlign: 'center' }}>
                <i className={props.img} style={{ fontSize: '5rem', margin: 'auto', marginTop: '1rem' }}></i>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.text}</Card.Text>
                </Card.Body>
            </Card>
        );
    }

    let isHomeActive = (menu == 'home');
    let isCreateActive = (menu == 'create');
    let isManageActive = (menu == 'manage');
    let isRunActive = (menu == 'run');
    let isViewActive = (menu == 'view');
    let isDashboardActive = (menu == 'dashboard');

    return (
        <>
            <Col xs={10}>
                <Container style={{ textAlign: "center" }}>
                    <h1>aZZure</h1>
                    <h2>Clermont INP's IoT VM Manager</h2>
                </Container>

                <Row>
                    <Collapse key={rowContent.length} in={(isHomeActive || isCreateActive)}>
                        <div className="col">
                            <CardItem key={rowContent.length + 1} card_id='1' title="Create a VM" text="Create a customized VM to store and process your IoT data" img="fas fa-cloud-upload-alt" />
                            <Collapse key={rowContent.length} in={isCreateActive}>
                                <div className="col" style={{ width: "50%", margin: "auto", textAlign: "center", justifyContent: "space-between" }}>
                                    <h1>Create a VM</h1>
                                    <hr />
                                    <h2>From an existing configuration file:</h2>
                                    <UploadForm style={{ margin: "5%" }} />
                                    
                                    <hr />

                                    <h2>From scratch</h2>
                                    <div style={{ width: "50%", margin: "auto", textAlign: "center" }}>
                                        <h3>Databases:</h3>
                                        <Form style={{ margin: "5%" }}>
                                            <Form.Check type="switch" id="custom-switch" label="InfluxDB" />
                                            <Form.Check type="switch" id="custom-switch" label="MongoDB" />
                                            <Form.Check type="switch" id="custom-switch" label="MySQL" />
                                        </Form>

                                        <h3>Web servers:</h3>
                                        <Form style={{ margin: "5%" }}>
                                            <Form.Check type="switch" id="custom-switch" label="Grafana" />
                                            <Form.Check type="switch" id="custom-switch" label="Node-RED" />
                                            <Form.Check type="switch" id="custom-switch" label="Apache" />
                                        </Form>

                                        <h3>Programming languages:</h3>
                                        <Form style={{ margin: "5%" }}>
                                            <Form.Check type="switch" id="custom-switch" label="Python" />
                                            <Form.Check type="switch" id="custom-switch" label="Java" />
                                            <Form.Check type="switch" id="custom-switch" label="C++" />
                                        </Form>

                                        <h3>Other:</h3>
                                        <Form style={{ margin: "5%" }}>
                                            <Form.Check type="switch" id="custom-switch" label="MQTT" />
                                            <Form.Check type="switch" id="custom-switch" label="MQTT" />
                                            <Form.Check type="switch" id="custom-switch" label="MQTT" />
                                        </Form>

                                        <h3>VM name:</h3>
                                        <Form style={{ margin: "5%" }}>
                                            <Form.Control type="text" placeholder="Enter a name" />
                                        </Form>

                                        <h3>VM description:</h3>
                                        <Form style={{ margin: "5%" }}>
                                            <Form.Control type="text" placeholder="Enter a description" />
                                        </Form>

                                        <Form style={{ margin: "5%" }}>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Control style={{ width: "100%", height: "200px" }} type="text" label="Enter the configuration" placeholder="{name:'myVM'&#10;; services: {db: 'influxdb'; web: 'grafana'};" />
                                            </Form.Group>
                                        </Form>

                                        <h3>Confirm configuration</h3>
                                        <Button style={{ margin: "5%" }} variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>

                                </div>
                            </Collapse>
                        </div>
                    </Collapse>

                    <Collapse key={rowContent.length} in={(isHomeActive || isManageActive)}>
                        <div className="col">
                            <CardItem key={rowContent.length + 1} card_id='2' title="Manage your VMs" text="Manage your VMs" img="fas fa-desktop" />
                        </div>
                    </Collapse>

                    <Collapse key={rowContent.length} in={(isHomeActive || isRunActive)}>
                        <div className="col">
                            <CardItem key={rowContent.length + 1} card_id='3' title="Run a VM" text="Run a VM" img="fas fa-play" />
                        </div>
                    </Collapse>

                    <Collapse key={rowContent.length} in={(isHomeActive || isViewActive)}>
                        <div className="col">
                            <CardItem key={rowContent.length + 1} card_id='4' title="View your VMs" text="View your VMs" img="fas fa-eye" />
                        </div>
                    </Collapse>

                    <Collapse key={rowContent.length} in={(isHomeActive || isDashboardActive)}>
                        <div className="col">
                            <CardItem key={rowContent.length + 1} card_id='5' title="Dashboard" text="Dashboard" img="fas fa-chart-line" />
                        </div>
                    </Collapse>

                </Row>

            </Col>

        </>
    );
}

export default Mainbar;