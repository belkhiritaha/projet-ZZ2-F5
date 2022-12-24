import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './mainbar.css';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import './card.css'
import CreateForm from './create';
import Manage from './manage';
import Cli from './cli';


function Mainbar(props) {
    // shown menu state
    const [menu, setMenu] = useState(props.page);


    function CardItem(props) {

        function handleCardClick(id) {
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
                    setMenu('cli');
                }
                else if (id == 4) {
                    setMenu('view');
                }
                else if (id == 5) {
                    setMenu('dashboard');
                }
            }
        }


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
    let isRunActive = (menu == 'cli');
    let isViewActive = (menu == 'view');
    let isDashboardActive = (menu == 'dashboard');

    // if user undefined, show login and register
    if (props.user == undefined) {
        return (
            <Container>
                <Row>
                    <div id="home">
                        <h1>Welcome to aZZure</h1>
                        <p>aZZure is a cloud computing platform that allows you to create, manage and run virtual machines geared towards IoT.</p>
                        <p>It is a project for the ZZ2 year at ISIMA.</p>
                        <p>To access all its cool features, you need to login first.</p>
                    </div>
                </Row>
            </Container>
        );
    }

    return (
        <>
            <Col xs={12}>
                <Container style={{ textAlign: "center" }}>
                    <h1>aZZure</h1>
                    <h2>Clermont INP's IoT VM Manager</h2>
                </Container>

                <Row>
                    <Collapse  in={(isHomeActive || isCreateActive)}>
                        <div className="col">
                            <CardItem  card_id='1' title="Create a VM" text="Create a customized VM to store and process your IoT data" img="fas fa-cloud-upload-alt" />
                            <Collapse  in={isCreateActive}>
                                <div className="col">
                                    <CreateForm {...props} />
                                </div>
                            </Collapse>
                        </div>
                    </Collapse>

                    <Collapse  in={(isHomeActive || isManageActive)}>
                        <div className="col">
                            <CardItem  card_id='2' title="Manage your VMs" text="Manage your VMs" img="fas fa-desktop" />
                            <Collapse  in={isManageActive}>
                                <div className="col">
                                    <Manage {...props}/>
                                </div>
                            </Collapse>
                        </div>
                    </Collapse>

                    <Collapse  in={(isHomeActive || isRunActive)}>
                        <div className="col">
                            <CardItem  card_id='3' title="Run a CLI" text="Run a CLI" img="fas fa-terminal" />
                            <Collapse  in={isRunActive}>
                                <div className="col">
                                    <Cli {...props}/>
                                </div>
                            </Collapse>
                        </div>
                    </Collapse>

                    <Collapse  in={(isHomeActive || isViewActive)}>
                        <div className="col">
                            <CardItem  card_id='4' title="View your VMs" text="View your VMs" img="fas fa-eye" />
                        </div>
                    </Collapse>

                    <Collapse  in={(isHomeActive || isDashboardActive)}>
                        <div className="col">
                            <CardItem  card_id='5' title="Dashboard" text="Dashboard" img="fas fa-chart-line" />
                        </div>
                    </Collapse>

                </Row>

            </Col>

        </>
    );
}

export default Mainbar;