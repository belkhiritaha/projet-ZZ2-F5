import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import UploadForm, { Switch } from './form';
import './card.css'


function Manage() {
    // about this section:
    // this section is for managing the VMs
    // it will be a list of VMs with a button to delete them
    // and a button to edit them
    // it will also have a button to refresh the list of VMs
    // it will also have a button to start all VMs
    // it will also have a button to stop all VMs
    // it will also have a button to restart all VMs
    // it will also have a button to delete all VMs

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
        ]);
    
    };

    function deleteVM() {
    };

    function editVM() {
        setOpen(!open);
    };

    function createVM() {
        
    };

    const VMsList = VMs.map((VM) =>
        <div style={{textAlign: "center", margin: "5%"}} key={VM.name}>
            <Card>
                <Card.Header>
                    <Form style={{textAlign: "center", margin: "auto", justifyContent: "space-between"}} inline>
                        <Form.Label className="mr-sm-2">
                            {VM.name}
                        </Form.Label>
                        <Button variant="danger" className="mr-sm-2" onClick={deleteVM}>
                            Delete
                        </Button>
                        <Button variant="primary" className="mr-sm-2" onClick={editVM}>
                            Edit
                        </Button>
                    </Form>
                </Card.Header>
                <Collapse style={{textAlign: "center", margin: "5%"}} in={open}>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter description" value={VM.desc} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>RAM</Form.Label>
                                <Form.Control type="text" placeholder="Enter RAM" value={VM.ram} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>CPU</Form.Label>
                                <Form.Control type="text" placeholder="Enter CPU" value={VM.cpu} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Disk</Form.Label>
                                <Form.Control type="text" placeholder="Enter Disk" value={VM.disk} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Network</Form.Label>
                                <Form.Control type="text" placeholder="Enter Network" value={VM.network} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text" placeholder="Enter Image" value={VM.image} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Services</Form.Label>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Database</Form.Label>
                                    <Switch label="InfluxDB" checked={VM.services.db.influxdb} />
                                    <Switch label="MongoDB" checked={VM.services.db.mongodb} />
                                    <Switch label="MySQL" checked={VM.services.db.mysql} />
                                    <Switch label="PostgreSQL" checked={VM.services.db.postgresql} />
                                    <Switch label="Redis" checked={VM.services.db.redis} />
                                    <Switch label="MariaDB" checked={VM.services.db.mariadb} />
                                    <Switch label="SQLite" checked={VM.services.db.sqlite} />
                                    <Switch label="Oracle" checked={VM.services.db.oracle} />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Web</Form.Label>
                                    <Switch label="Grafana" checked={VM.services.web.grafana} />
                                    <Switch label="Node-RED" checked={VM.services.web.nodered} />
                                    <Switch label="Apache" checked={VM.services.web.apache} />
                                    <Switch label="Nginx" checked={VM.services.web.nginx} />
                                    <Switch label="Tomcat" checked={VM.services.web.tomcat} />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Other</Form.Label>
                                    <Switch label="MQTT" checked={VM.services.other.mqtt} />
                                    <Switch label="SSH" checked={VM.services.other.ssh} />
                                    <Switch label="HTTP" checked={VM.services.other.http} />
                                    <Switch label="HTTPS" checked={VM.services.other.https} />
                                    <Switch label="FTP" checked={VM.services.other.ftp} />
                                </Form.Group>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Collapse>
            </Card>
        </div>
    );

    console.log("vms: "+ VMs);

    // render
    return (
        <div>
            <h1>Virtual Machines</h1>
            <Button variant="primary" className="mr-sm-2" onClick={() => setOpen(!open)}>
                {open ? 'Hide' : 'Show'} VMs
            </Button>
            <Button variant="primary" className="mr-sm-2" onClick={refreshVMs}>
                Refresh
            </Button>
            <Button variant="primary" className="mr-sm-2" onClick={createVM}>
                Create
            </Button>
            <div>
                {VMsList}
            </div>
        </div>
    );


};

export default Manage;