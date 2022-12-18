import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './card.css'

function Manage(props) {
    function ManageCard(props) {
        const [open, setOpen] = useState(false);

        function deleteVM() {
            console.log(props.VM)
            if (window.confirm("Are you sure you want to delete this VM?")) {
                if (document.cookie) {
                    var cookie = document.cookie.split(";");
                    var token = cookie[0].split("=")[1];
                    fetch(`http://localhost:8001/api/users/${props.user.id}/vms/${props.VM.id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "VM deleted") {
                                window.location.reload();
                            }
                            else {
                                alert("Error deleting VM")
                            }
                        })
                }
            }
        };

        function editVM() {
            // setOpen(!open);
        };

        function createVM() {

        };

        function onsubmit(event, VM) {
            event.preventDefault()
        }

        function updateService(serviceName) {
            if (props.VM.services.includes(serviceName)) {
                props.VM.services = props.VM.services.filter(item => item !== serviceName);
            }
            else {
                props.VM.services.push(serviceName);
            }
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
                            <div onClick={() => { setOpen(!open) }} className='row'>
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
                                <Form onSubmit={() => { this.event.preventDefault(); }}>
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
                                        <Form.Control onChange={e => { props.VM.os = e.target.value }} type="text" placeholder="Enter Image" defaultValue={props.VM.os} />
                                    </Form.Group>
                                    <Form.Group>
                                        <h3>Services</h3>
                                        <Form.Group>
                                            <h3>Database</h3>
                                            <Form.Check type="switch" label="InfluxDB" defaultChecked={props.VM.services.includes("influxdb")} onChange={() => { updateService("influxdb") }} />
                                            <Form.Check type="switch" label="MongoDB" defaultChecked={props.VM.services.includes("mongodb")} onChange={() => { updateService("mongodb") }} />
                                            <Form.Check type="switch" label="MySQL" defaultChecked={props.VM.services.includes("mysql")} onChange={() => { updateService("mysql") }} />
                                            <Form.Check type="switch" label="PostgreSQL" defaultChecked={props.VM.services.includes("postgresql")} onChange={() => { updateService("postgresql") }} />
                                            <Form.Check type="switch" label="Redis" defaultChecked={props.VM.services.includes("redis")} onChange={() => { updateService("redis") }} />
                                            <Form.Check type="switch" label="MariaDB" defaultChecked={props.VM.services.includes("mariadb")} onChange={() => { updateService("mariadb") }} />
                                            <Form.Check type="switch" label="SQLite" defaultChecked={props.VM.services.includes("sqlite")} onChange={() => { updateService("sqlite") }} />
                                            <Form.Check type="switch" label="Oracle" defaultChecked={props.VM.services.includes("oracle")} onChange={() => { updateService("oracle") }} />
                                        </Form.Group>
                                        <Form.Group>
                                            <h3>Web</h3>
                                            <Form.Check type="switch" label="Grafana" defaultChecked={props.VM.services.includes("grafana")} onChange={() => { updateService("grafana") }} />
                                            <Form.Check type="switch" label="Node-RED" defaultChecked={props.VM.services.includes("nodered")} onChange={() => { updateService("nodered") }} />
                                            <Form.Check type="switch" label="Apache" defaultChecked={props.VM.services.includes("apache")} onChange={() => { updateService("apache") }} />
                                            <Form.Check type="switch" label="Nginx" defaultChecked={props.VM.services.includes("nginx")} onChange={() => { updateService("nginx") }} />
                                            <Form.Check type="switch" label="Tomcat" defaultChecked={props.VM.services.includes("php")} onChange={() => { updateService("tomcat") }} />
                                        </Form.Group>
                                        <Form.Group>
                                            <h3>Other</h3>
                                            <Form.Check type="switch" label="MQTT" defaultChecked={props.VM.services.includes("mqtt")} onChange={() => { updateService("mqtt") }} />
                                            <Form.Check type="switch" label="SSH" defaultChecked={props.VM.services.includes("ssh")} onChange={() => { updateService("ssh") }} />
                                            <Form.Check type="switch" label="HTTP" defaultChecked={props.VM.services.includes("http")} onChange={() => { updateService("http") }} />
                                            <Form.Check type="switch" label="HTTPS" defaultChecked={props.VM.services.includes("https")} onChange={() => { updateService("https") }} />
                                            <Form.Check type="switch" label="FTP" defaultChecked={props.VM.services.includes("ftp")} onChange={() => { updateService("ftp") }} />
                                        </Form.Group>

                                        <Form.Group>
                                            <h3>Submit changes</h3>
                                            <Button variant="primary" type="submit" onClick={(e) => { onsubmit(e, props.VM) }}>
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
    const [VMs, setVMs] = useState({ VMs: [] });
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
                    disk: VM.disk,
                    network: VM.network,
                    os: VM.os,
                    services: VM.services,
                    status: VM.status
                }
            })
        }
        return returnObject;
    }


    async function getAllVMs() {
        return new Promise((resolve, reject) => {
            // get cookie
            if (document.cookie) {
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
            let responseVMs = responseToShape(data)
            setVMs((VMs) => responseVMs);
            let newCards = [];
            responseVMs.VMs.map((VM) => {
                newCards.push(
                    <ManageCard VM={VM} key={VM.id} user={props.user} />
                );
            });
            setCards(newCards);
            setLoading(false);
        }).catch((error) => {
            setLoading(true);
        });
    }

    useEffect(() => {
        refreshVms();
    }, []);

    if (loading) {
        return (
            <>
                <div className='loading-container'>
                    <div className="lds-dual-ring"></div>
                    <div className="loading">Loading...</div>
                </div>
            </>
        )
    }


    return (
        <div style={{ margin: "auto", textAlign: "center", alignContent: "space-between" }}>
            <h1>Virtual Machines</h1>
            <Button style={{ margin: "1%", width: "25%" }} variant="primary" className="mr-sm-2" onClick={refreshVms}>
                Refresh
            </Button>
            <div>
                {cards}
            </div>
        </div>
    );


};

export default Manage;