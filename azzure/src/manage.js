import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import UploadForm, { Switch } from './form';
import './card.css'

function Manage() {
    function ManageCard(props) {
        const [open, setOpen] = useState(false);
        console.log(props);

        function deleteVM() {
        };

        function editVM() {
            // setOpen(!open);
        };

        function createVM() {

        };

        function submitChanges() {

        };

        function runVM() {

        };

        function stopVM() {

        };

        return (
            <div className="manage-card">
                <div style={{ textAlign: "center", margin: "5%" }} key={props.VM.name}>
                    <Card>
                        <Card.Header>
                            <div onClick={() => {setOpen(!open)}} className='row'>
                                <h3 className="mr-sm-2">
                                    {props.VM.name}
                                </h3>
                                <Button style={{ width: "12%", margin: "1% auto" }} variant="danger" className="mr-sm-2" onClick={deleteVM}>
                                    Delete
                                </Button>
                                <Button style={{ width: "12%", margin: "1% auto" }} variant="primary" className="mr-sm-2" onClick={editVM}>
                                    Edit
                                </Button>
                                <Button style={{ width: "12%", margin: "1% auto" }} variant="success" className="mr-sm-2" onClick={runVM}>
                                    Run
                                </Button>
                                <Button style={{ width: "12%", margin: "1% auto" }} variant="warning" className="mr-sm-2" onClick={stopVM}>
                                    Stop
                                </Button>
                            </div>
                        </Card.Header>
                        <Collapse style={{ textAlign: "center", margin: "5% auto", width: "50%" }} in={open}>
                            <Card.Body>
                                <Form onSubmit={submitChanges}>
                                    <Form.Group controlId="formBasicEmail">
                                        <h3>Description</h3>
                                        <Form.Control onChange={e => { props.VM.desc = e.target.value }} type="text" placeholder="Enter description" defaultValue={props.VM.desc} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <h3>RAM</h3>
                                        <Form.Control type="text" placeholder="Enter RAM" defaultValue={props.VM.ram} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <h3>CPU</h3>
                                        <Form.Control type="text" placeholder="Enter CPU" defaultValue={props.VM.cpu} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <h3>Disk</h3>
                                        <Form.Control type="text" placeholder="Enter Disk" defaultValue={props.VM.disk} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <h3>Network</h3>
                                        <Form.Control type="text" placeholder="Enter Network" defaultValue={props.VM.network} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <h3>Image</h3>
                                        <Form.Control type="text" placeholder="Enter Image" defaultValue={props.VM.image} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <h3>Services</h3>
                                        <Form.Group controlId="formBasicEmail">
                                            <h3>Database</h3>
                                            <Form.Check type="switch" label="InfluxDB" defaultChecked={props.VM.services.db.influxdb} onChange={e => { props.VM.services.db.influxdb = e.target.checked }} />
                                            <Form.Check type="switch" label="MongoDB" defaultChecked={props.VM.services.db.mongodb} onChange={e => { props.VM.services.db.mongodb = e.target.checked }} />
                                            <Form.Check type="switch" label="MySQL" defaultChecked={props.VM.services.db.mysql} onChange={e => { props.VM.services.db.mysql = e.target.checked }} />
                                            <Form.Check type="switch" label="PostgreSQL" defaultChecked={props.VM.services.db.postgresql} onChange={e => { props.VM.services.db.postgresql = e.target.checked }} />
                                            <Form.Check type="switch" label="Redis" defaultChecked={props.VM.services.db.redis} onChange={e => { props.VM.services.db.redis = e.target.checked }} />
                                            <Form.Check type="switch" label="MariaDB" defaultChecked={props.VM.services.db.mariadb} onChange={e => { props.VM.services.db.mariadb = e.target.checked }} />
                                            <Form.Check type="switch" label="SQLite" defaultChecked={props.VM.services.db.sqlite} onChange={e => { props.VM.services.db.sqlite = e.target.checked }} />
                                            <Form.Check type="switch" label="Oracle" defaultChecked={props.VM.services.db.oracle} onChange={e => { props.VM.services.db.oracle = e.target.checked }} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <h3>Web</h3>
                                            <Form.Check type="switch" label="Grafana" defaultChecked={props.VM.services.web.grafana} onChange={e => { props.VM.services.web.grafana = e.target.checked }} />
                                            <Form.Check type="switch" label="Node-RED" defaultChecked={props.VM.services.web.nodered} onChange={e => { props.VM.services.web.nodered = e.target.checked }} />
                                            <Form.Check type="switch" label="Apache" defaultChecked={props.VM.services.web.apache} onChange={e => { props.VM.services.web.apache = e.target.checked }} />
                                            <Form.Check type="switch" label="Nginx" defaultChecked={props.VM.services.web.nginx} onChange={e => { props.VM.services.web.nginx = e.target.checked }} />
                                            <Form.Check type="switch" label="Tomcat" defaultChecked={props.VM.services.web.tomcat} onChange={e => { props.VM.services.web.tomcat = e.target.checked }} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <h3>Other</h3>
                                            <Form.Check type="switch" label="MQTT" defaultChecked={props.VM.services.other.mqtt} onChange={e => { props.VM.services.other.mqtt = e.target.checked }} />
                                            <Form.Check type="switch" label="SSH" defaultChecked={props.VM.services.other.ssh} onChange={e => { props.VM.services.other.ssh = e.target.checked }} />
                                            <Form.Check type="switch" label="HTTP" defaultChecked={props.VM.services.other.http} onChange={e => { props.VM.services.other.http = e.target.checked }} />
                                            <Form.Check type="switch" label="HTTPS" defaultChecked={props.VM.services.other.https} onChange={e => { props.VM.services.other.https = e.target.checked }} />
                                            <Form.Check type="switch" label="FTP" defaultChecked={props.VM.services.other.ftp} onChange={e => { props.VM.services.other.ftp = e.target.checked }} />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <h3>Submit changes</h3>
                                            <Button variant="primary" type="submit" onClick={submitChanges}>
                                                Submit
                                            </Button>
                                        </Form.Group>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Collapse>
                    </Card>
                </div>
            </div>
        );
    }

    // state
    const [open, setOpen] = useState(false);
    const [VMs, setVMs] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // functions
    function getAllVMs() {
        // get all VMs
        // set VMs state to the list of VMs
        // set refresh state to false
        setRefresh(false);
        //return fetch('http://localhost:3000/api/vms')
        return {
            VMs: [
                {
                    name: "test",
                    desc: "test",
                    ram: "test",
                    cpu: "test",
                    disk: "test",
                    network: "test",
                    image: "test",
                    services: {
                        db: {
                            influxdb: false,
                            mongodb: false,
                            mysql: false,
                            postgresql: false,
                            redis: false,
                            mariadb: false,
                            sqlite: false,
                            oracle: false,
                        },
                        web: {
                            grafana: false,
                            nodered: false,
                            apache: false,
                            nginx: false,
                            tomcat: false,
                        },
                        other: {
                            mqtt: false,
                            ssh: false,
                            http: false,
                            https: false,
                            ftp: false,
                        }
                    }
                }
            ]
        };
    }

    function refreshVMs() {
        setVMs([
            {
                name: "My Super VM 1",
                desc: "My super vm to test my super IOT project",
                ram: "1024",
                cpu: "1",
                disk: "10",
                network: "bridge",
                image: "ubuntu",
                services: {
                    db: {
                        influxdb: false,
                        mongodb: false,
                        mysql: false,
                        postgresql: false,
                        redis: true,
                        mariadb: false,
                        sqlite: false,
                        oracle: false,
                    },
                    web: {
                        grafana: false,
                        nodered: false,
                        apache: false,
                        nginx: true,
                        tomcat: false,
                    },
                    other: {
                        mqtt: false,
                        ssh: false,
                        http: true,
                        https: false,
                        ftp: false,
                    }
                }
            },
            {
                name: "My Super VM 2",
                desc: "My super vm to test my super IOT project",
                ram: "1024",
                cpu: "1",
                disk: "10",
                network: "bridge",
                image: "ubuntu",
                services: {
                    db: {
                        influxdb: false,
                        mongodb: false,
                        mysql: false,
                        postgresql: false,
                        redis: true,
                        mariadb: false,
                        sqlite: false,
                        oracle: false,
                    },
                    web: {
                        grafana: false,
                        nodered: false,
                        apache: false,
                        nginx: true,
                        tomcat: false,
                    },
                    other: {
                        mqtt: false,
                        ssh: false,
                        http: true,
                        https: false,
                        ftp: false,
                    }
                }
            }
        ]);

    };

    function deleteVM() {
    };

    function editVM() {
        setOpen(!open);
    };

    function createVM() {

    };

    function submitChanges() {

    };

    // create new ManageCard for each VM in VMs
    const cards = VMs.map((VM) => {
        return (
            <ManageCard VM={VM} key={VM.name} />
        );
    });

    // return

    console.log("vms: " + VMs);

    // render
    return (
        <div style={{ margin: "auto", textAlign: "center", alignContent: "space-between" }}>
            <h1>Virtual Machines</h1>
            <Button style={{margin:"1%", width: "25%"}} variant="primary" className="mr-sm-2" onClick={refreshVMs}>
                Refresh
            </Button>
            <div>
                {cards}
            </div>
        </div>
    );


};

export default Manage;