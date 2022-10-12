import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import UploadForm, { Switch } from './form';
import './card.css'


function CreateForm(props) {

    const [state, setConfig] = useState({
        VMid : 0,
        VMname: "",
        VMdesc: "",
        VMram: "",
        VMcpu: "",
        VMdisk: "",
        VMnetwork: "",
        VMimage: "",
        VMservices: {
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
    });

    console.log("state to string", JSON.stringify(state));
    console.log("state", state);



    function setState(name, value) {
        state[name] = value;
    }

    function setServicesState(name, field) {
        const value = !state.VMservices[name][field];
        state.VMservices[name][field] = value;
        console.log("set " + name + " " + field + " to " + value);
    }

    function getCurrentConfig() {
        // return state to string
        console.log(JSON.stringify(state));
        return JSON.stringify(state);
    }

    function onsubmit(event) {
        event.preventDefault();
        console.log("submitted");
        state.VMid = Math.floor(Math.random() * 1000000);
        console.log(state);

    }

    return (
        <div className="col" style={{ width: "100%", margin: "auto", textAlign: "center", justifyContent: "space-between" }}>
            <h1>Create a VM</h1>
            <hr />
            <h2>From an existing configuration file:</h2>
            <UploadForm style={{ margin: "5%" }} />
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Control style={{ width: "100%", height: "200px" }} type="text" label="Enter the configuration" placeholder="{name:'myVM'; services: {db: 'influxdb'; web: 'grafana'};" />
            </Form.Group>
            <hr />

            <h2>From scratch</h2>
            <div style={{ width: "50%", margin: "auto", textAlign: "center" }}>
                <Form style={{ margin: "5%" }}>
                    <Form.Group controlId="VMname">
                        <Form.Label>VM Name</Form.Label>
                        <Form.Control onChange={e => { setState("VMname", e.target.value) }} type="text" placeholder="Enter VM name" />
                    </Form.Group>

                    <Form.Group controlId="VMdesc">
                        <Form.Label>VM Description</Form.Label>
                        <Form.Control onChange={e => { setState("VMdesc", e.target.value) }} type="text" placeholder="Enter VM name" />
                    </Form.Group>

                    <Form.Group controlId="VMram">
                        <Form.Label>RAM</Form.Label>
                        <Form.Control onChange={e => { setState("VMram", e.target.value) }} type="text" placeholder="Enter RAM" />
                    </Form.Group>

                    <Form.Group controlId="VMcpu">
                        <Form.Label>Number of CPUs</Form.Label>
                        <Form.Control onChange={e => { setState("VMcpu", e.target.value) }} type="text" placeholder="Enter number of CPUs" />
                    </Form.Group>

                    <Form.Group controlId="VMdisk">
                        <Form.Label>Storage</Form.Label>
                        <Form.Control onChange={e => { setState("VMdisk", e.target.value) }} type="text" placeholder="Enter storage" />
                    </Form.Group>

                    <Form.Group controlId="VMnetwork">
                        <Form.Label>Network</Form.Label>
                        <Form.Control onChange={e => { setState("VMnetwork", e.target.value) }} type="text" placeholder="Enter network" />
                    </Form.Group>

                    <Form.Group controlId="VMos">
                        <Form.Label>OS</Form.Label>
                        <Form.Control onChange={e => { setState("VMimage", e.target.value) }} type="text" placeholder="Enter OS" />
                    </Form.Group>

                    <Form.Group style={{ margin: "5%" }} controlId="VMdb">
                        <h3>Databases:</h3>
                        <Form.Check onChange={e => { setServicesState("db", "influxdb") }} type="switch" id="custom-switch" label="InfluxDB" />
                        <Form.Check onChange={e => { setServicesState("db", "mongodb") }} type="switch" id="custom-switch" label="MongoDB" />
                        <Form.Check onChange={e => { setServicesState("db", "mysql") }} type="switch" id="custom-switch" label="MySQL" />
                        <Form.Check onChange={e => { setServicesState("db", "postgresql") }} type="switch" id="custom-switch" label="PostgreSQL" />
                        <Form.Check onChange={e => { setServicesState("db", "redis") }} type="switch" id="custom-switch" label="Redis" />
                    </Form.Group>

                    <Form.Group style={{ margin: "5%" }} controlId="VMweb">
                        <h3>Web servers:</h3>
                        <Form.Check onChange={e => { setServicesState("web", "grafana") }} type="switch" id="custom-switch" label="Grafana" />
                        <Form.Check onChange={e => { setServicesState("web", "nodered") }} type="switch" id="custom-switch" label="Node-RED" />
                        <Form.Check onChange={e => { setServicesState("web", "apache") }} type="switch" id="custom-switch" label="Apache" />
                        <Form.Check onChange={e => { setServicesState("web", "nginx") }} type="switch" id="custom-switch" label="Nginx" />
                        <Form.Check onChange={e => { setServicesState("web", "tomcat") }} type="switch" id="custom-switch" label="Tomcat" />
                    </Form.Group>

                    <Form.Group style={{ margin: "5%" }} controlId="VMother">
                        <h3>Other:</h3>
                        <Form.Check onChange={e => { setServicesState("other", "mqtt") }} type="switch" id="custom-switch" label="MQTT" />
                        <Form.Check onChange={e => { setServicesState("other", "ssh") }} type="switch" id="custom-switch" label="SSH" />
                        <Form.Check onChange={e => { setServicesState("other", "http") }} type="switch" id="custom-switch" label="HTTP" />
                        <Form.Check onChange={e => { setServicesState("other", "https") }} type="switch" id="custom-switch" label="HTTPS" />
                        <Form.Check onChange={e => { setServicesState("other", "ftp") }} type="switch" id="custom-switch" label="FTP" />
                    </Form.Group>


                    <h3>Confirm configuration</h3>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Control style={{ width: "100%", height: "200px" }} type="text" label="Enter the configuration" value={JSON.stringify(state)} onChange={e => { setConfig(JSON.parse(e.target.value)); console.log(JSON.stringify(state)) }} />
                    </Form.Group>
                    <Button onClick={onsubmit} style={{ margin: "5%" }} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        </div>
    );
}


export default CreateForm;