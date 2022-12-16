import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import UploadForm, { Switch } from './form';
import { JsonEditor as Editor } from 'jsoneditor-react';


import 'jsoneditor-react/es/editor.min.css';
import './card.css'
import './create.css'


function CreateForm(props) {

    const [state, setConfig] = useState({
        VMid: 0,
        VMname: "test",
        VMdesc: "test",
        VMram: "test",
        VMcpu: "test",
        VMdisk: "test",
        VMnetwork: "test",
        VMimage: "test",
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

    function onsubmit(event, id) {
        event.preventDefault();
        console.log("submitted");

        // check if VMram, VMcpu, VMdisk are numbers and if all fields are filled
        if (isNaN(state.VMram) || isNaN(state.VMcpu) || isNaN(state.VMdisk) || state.VMid === 0 || state.VMname === "" || state.VMdesc === "" || state.VMnetwork === "" || state.VMimage === "") {
            document.getElementById(id).classList.add("shake");
            console.log(isNaN(state.VMram));
            console.log(isNaN(state.VMcpu));
            console.log(isNaN(state.VMdisk));
            console.log(state.VMid === 0);
            console.log(state.VMname === "");
            console.log(state.VMdesc === "");
            console.log(state.VMnetwork === "");
            console.log(state.VMimage === "");
            

            // add p element with error message
            document.getElementById("error").innerHTML = "Please fill all fields with valid values";
            setTimeout(() => {
                document.getElementById(id).classList.remove("shake");
            }
                , 500);

            setTimeout(() => {
                document.getElementById("error").innerHTML = "";
            }
                , 5000);

            return false;
        }
        else {
            // // send to localhost:8000
    
            fetch('http://localhost:8000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: getCurrentConfig(),
            }).then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        console.log(state);
        return true;

    }

    return (
        <div className="col" style={{ width: "100%", margin: "auto", textAlign: "center", justifyContent: "space-between" }}>
            <h1>Create a VM</h1>
            <hr />
            <div style={{ width: "80%", margin: "auto", textAlign: "center", justifyContent: "space-between" }}>
                <h2>From an existing configuration file:</h2>
                <UploadForm style={{ margin: "5%" }} />
                <Editor
                    value={state}
                    onChange={
                        (value) => {
                            console.log(value);
                            setConfig(value);
                        }
                    }
                />
                <Button id="button" onClick={
                    (event) => {
                        onsubmit(event, "button");
                    }
                }
                    style={{ margin: "5%" }} variant="primary" type="submit">
                    Submit
                </Button>
                <p id="error" style={{ color: "red" }}></p>
            </div>
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
                        <Form.Control onChange={e => { setState("VMram", parseInt(e.target.value)) }} type="text" placeholder="Enter RAM" />
                    </Form.Group>

                    <Form.Group controlId="VMcpu">
                        <Form.Label>Number of CPUs</Form.Label>
                        <Form.Control onChange={e => { setState("VMcpu", parseInt(e.target.value)) }} type="text" placeholder="Enter number of CPUs" />
                    </Form.Group>

                    <Form.Group controlId="VMdisk">
                        <Form.Label>Storage</Form.Label>
                        <Form.Control onChange={e => { setState("VMdisk", parseInt(e.target.value)) }} type="text" placeholder="Enter storage" />
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


                    <Button id="button1" onClick={
                        (event) => {
                            onsubmit(event, "button1");
                        }
                    }
                        style={{ margin: "5%" }} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        </div>
    );
}


export default CreateForm;