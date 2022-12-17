import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import UploadForm, { Switch } from './form';
import './card.css'
import { get } from 'mongoose';

function Manage(props) {
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

        function onsubmit(event, VM) {
            event.preventDefault()
            console.log("submit");
            console.log(VM);
        }

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
                                <Form onSubmit={() => {this.event.preventDefault();}}>
                                    <Form.Group>
                                        <h3>Description</h3>
                                        <Form.Control onChange={e => { props.VM.desc = e.target.value }} type="text" placeholder="Enter description" defaultValue={props.VM.desc} />
                                    </Form.Group>
                                    <Form.Group>
                                        <h3>RAM</h3>
                                        <Form.Control onChange={e => { props.VM.ram = e.target.value }} type="text" placeholder="Enter RAM" defaultValue={props.VM.ram} />
                                    </Form.Group>
                                    <Form.Group>
                                        <h3>CPU</h3>
                                        <Form.Control onChange={e => { props.VM.cpu = e.target.value }} type="text" placeholder="Enter CPU" defaultValue={props.VM.cpu} />
                                    </Form.Group>
                                    <Form.Group>
                                        <h3>Disk</h3>
                                        <Form.Control onChange={e => { props.VM.disk = e.target.value }} type="text" placeholder="Enter Disk" defaultValue={props.VM.disk} />
                                    </Form.Group>
                                    <Form.Group>
                                        <h3>Network</h3>
                                        <Form.Control onChange={e => { props.VM.network = e.target.value }} type="text" placeholder="Enter Network" defaultValue={props.VM.network} />
                                    </Form.Group>
                                    <Form.Group>
                                        <h3>Image</h3>
                                        <Form.Control onChange={e => { props.VM.image = e.target.value }} type="text" placeholder="Enter Image" defaultValue={props.VM.image} />
                                    </Form.Group>
                                    <Form.Group>
                                        <h3>Services</h3>
                                        <Form.Group>
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
                                        <Form.Group>
                                            <h3>Web</h3>
                                            <Form.Check type="switch" label="Grafana" defaultChecked={props.VM.services.web.grafana} onChange={e => { props.VM.services.web.grafana = e.target.checked }} />
                                            <Form.Check type="switch" label="Node-RED" defaultChecked={props.VM.services.web.nodered} onChange={e => { props.VM.services.web.nodered = e.target.checked }} />
                                            <Form.Check type="switch" label="Apache" defaultChecked={props.VM.services.web.apache} onChange={e => { props.VM.services.web.apache = e.target.checked }} />
                                            <Form.Check type="switch" label="Nginx" defaultChecked={props.VM.services.web.nginx} onChange={e => { props.VM.services.web.nginx = e.target.checked }} />
                                            <Form.Check type="switch" label="Tomcat" defaultChecked={props.VM.services.web.tomcat} onChange={e => { props.VM.services.web.tomcat = e.target.checked }} />
                                        </Form.Group>
                                        <Form.Group>
                                            <h3>Other</h3>
                                            <Form.Check type="switch" label="MQTT" defaultChecked={props.VM.services.other.mqtt} onChange={e => { props.VM.services.other.mqtt = e.target.checked }} />
                                            <Form.Check type="switch" label="SSH" defaultChecked={props.VM.services.other.ssh} onChange={e => { props.VM.services.other.ssh = e.target.checked }} />
                                            <Form.Check type="switch" label="HTTP" defaultChecked={props.VM.services.other.http} onChange={e => { props.VM.services.other.http = e.target.checked }} />
                                            <Form.Check type="switch" label="HTTPS" defaultChecked={props.VM.services.other.https} onChange={e => { props.VM.services.other.https = e.target.checked }} />
                                            <Form.Check type="switch" label="FTP" defaultChecked={props.VM.services.other.ftp} onChange={e => { props.VM.services.other.ftp = e.target.checked }} />
                                        </Form.Group>

                                        <Form.Group>
                                            <h3>Submit changes</h3>
                                            <Button variant="primary" type="submit" onClick={(e) => {onsubmit(e, props.VM)}}>
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
    const [VMs, setVMs] = useState({VMs: []});
    const [refresh, setRefresh] = useState(false);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);


    // functions
    function responseToShape(response) {
        const returnObject = {
            VMs: response.map((VM) => {
                return {
                    id: VM._id,
                    name: VM.name,
                    desc: VM.description,
                    ram: VM.ram,
                    cpu: VM.cpu,
                    services: {
                        // check if db is in the array
                        db: {
                            mysql: VM.services.includes("mysql"),
                            postgresql: VM.services.includes("postgresql"),
                            redis: VM.services.includes("redis"),
                            mariadb: VM.services.includes("mariadb"),
                            sqlite: VM.services.includes("sqlite"),
                            oracle: VM.services.includes("oracle"),
                        },
                        web: {
                            grafana: VM.services.includes("grafana"),
                            nodered: VM.services.includes("nodered"),
                            apache: VM.services.includes("apache"),
                            nginx: VM.services.includes("nginx"),
                            tomcat: VM.services.includes("tomcat"),
                        },
                        other: {
                            mqtt: VM.services.includes("mqtt"),
                            ssh: VM.services.includes("ssh"),
                            http: VM.services.includes("http"),
                            https: VM.services.includes("https"),
                            ftp: VM.services.includes("ftp")
                        }
                    }
                }
            })
        }
        console.log(returnObject);
        return returnObject;
    }


    async function getAllVMs() {
        return new Promise((resolve, reject) => {
            // get cookie
            if (document.cookie) {
                console.log(document.cookie);
                // get cookie
                const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionCookie='));
                const cookieValue = sessionCookie.split('=')[1];
                fetch(`http://localhost:8001/api/users/${props.user.id}/vms`, {
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
                    console.error('Error:', error);
                    reject(error);
                });
            }
        })
    }

    function deleteVM() {
    };

    function editVM() {
        setOpen(!open);
    };

    function createVM() {

    };

    function refreshVms() {
        getAllVMs().then((data) => {
            console.log("response: ", responseToShape(data));
            let responseVMs = responseToShape(data)
            setVMs((VMs) => responseVMs);
            console.log("vms: ", VMs);
            let newCards = [];
            responseVMs.VMs.map((VM) => {
                newCards.push(
                    <ManageCard VM={VM} key={VM.id} />
                );
            });
            console.log("new cards: ", newCards);
            setCards(newCards);
            console.log("card:", cards);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        refreshVms();
    }, []);
    
    if (loading) {
        return (
            <>
                <div className="lds-dual-ring"></div>
                <div className="loading">Loading...</div>
            </>
        )
    }
    

    return (
        <div style={{ margin: "auto", textAlign: "center", alignContent: "space-between" }}>
            <h1>Virtual Machines</h1>
            <Button style={{margin:"1%", width: "25%"}} variant="primary" className="mr-sm-2" onClick={refreshVms}>
                Refresh
            </Button>
            <div>
                {cards}
            </div>
        </div>
    );


};

export default Manage;