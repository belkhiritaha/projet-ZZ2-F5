import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import UploadForm from './form';


import './card.css'
import './create.css'
import { json } from 'react-router-dom';


function CreateForm(props) {

    const [state, setConfig] = useState({
        name: "test",
        description: "test",
        ram: "1",
        cpu: "1",
        disk: "1",
        network: "test",
        os: "Ubuntu",
        services: ["ssh"],
    });


    function setState(name, value) {
        state[name] = value;
    }

    function setServicesState(field) {
        // if field in services
        if (state.services.includes(field)) {
            // remove field from services
            state.services = state.services.filter(item => item !== field);
        } else {
            // add field to services
            state.services.push(field);
        }
    }

    function showError(id) {
        document.getElementById(id).classList.add("shake");

        // add p element with error message
        document.getElementById(id).innerHTML = "Error creating VM";
        setTimeout(() => {
            document.getElementById(id).classList.remove("shake");
        }
            , 500);

        setTimeout(() => {
            document.getElementById(id).innerHTML = "";
        }
            , 5000);
    }

    function showSuccess(id) {
        console.log(document.getElementById(id))
        document.getElementById(id).style.color = "green";
        document.getElementById(id).innerHTML = "VM created successfully";
        setTimeout(() => {
            document.getElementById(id).innerHTML = "";
            document.getElementById(id).style.color = "red";
        }
            , 5000);
    }


    function onSubmitManual(event, id) {
        event.preventDefault();

        // get textarea value
        const textarea = document.getElementById("jsonFormTextArea").value;
        let jsonData = {};
        try {
            jsonData = JSON.parse(textarea);
        }
        catch (error) {
            showError("error");
            return false;
        }

        if (jsonData.name === "" || jsonData.description === "" || jsonData.ram === "" || jsonData.cpu === "" || jsonData.disk === "" || jsonData.network === "" || jsonData.os === "") {
            showError("error");
            return false;
        }
        else {
            const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionCookie='));
            const cookieValue = sessionCookie.split('=')[1];
            fetch(`http://localhost:8001/api/users/${props.user.id}/vms`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookieValue}`
                },
                body: JSON.stringify(jsonData)
            })
                .then(response => response.json())
                .then(data => {
                    showSuccess("error");
                })
                .catch(error => {
                    showError("error");
                });
        }
        return true;
    }


    function onsubmit(event, id) {
        event.preventDefault();

        // check if VMram, VMcpu, VMdisk are numbers and if all fields are filled
        if (isNaN(state.ram) || isNaN(state.cpu) || isNaN(state.disk) || state.name === "" || state.description === "" || state.network === "" || state.os === "") {
            document.getElementById(id).classList.add("shake");

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
            const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionCookie='));
            const cookieValue = sessionCookie.split('=')[1];
            fetch(`http://localhost:8001/api/users/${props.user.id}/vms`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${cookieValue}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        return true;
    }

    return (
        <div className="col" style={{ width: "100%", margin: "auto", textAlign: "center", justifyContent: "space-between" }}>
            <h1>Create a VM</h1>
            <hr />
            <div style={{ width: "80%", margin: "auto", textAlign: "center", justifyContent: "space-between" }}>
                <h2>Customize your own VM:</h2>

                <Form>
                <Form.Group className="mb-3" controlId="jsonFormTextArea">
                    <Form.Control as="textarea" defaultValue={JSON.stringify(state, null, 2)}
                                 placeholder="Insert a valid JSON config" rows={15} />
                </Form.Group>
                </Form>


                <Button id="button" onClick={
                    (event) => {
                        onSubmitManual(event, "button");
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
                        <Form.Control onChange={e => { setState("name", e.target.value) }} type="text" placeholder="Enter VM name" />
                    </Form.Group>

                    <Form.Group controlId="VMdesc">
                        <Form.Label>VM Description</Form.Label>
                        <Form.Control onChange={e => { setState("description", e.target.value) }} type="text" placeholder="Enter VM name" />
                    </Form.Group>

                    <Form.Group controlId="VMram">
                        <Form.Label>RAM</Form.Label>
                        <Form.Control onChange={e => { setState("ram", parseInt(e.target.value)) }} type="text" placeholder="Enter RAM" />
                    </Form.Group>

                    <Form.Group controlId="VMcpu">
                        <Form.Label>Number of CPUs</Form.Label>
                        <Form.Control onChange={e => { setState("cpu", parseInt(e.target.value)) }} type="text" placeholder="Enter number of CPUs" />
                    </Form.Group>

                    <Form.Group controlId="VMdisk">
                        <Form.Label>Storage</Form.Label>
                        <Form.Control onChange={e => { setState("disk", parseInt(e.target.value)) }} type="text" placeholder="Enter storage" />
                    </Form.Group>

                    <Form.Group controlId="VMnetwork">
                        <Form.Label>Network</Form.Label>
                        <Form.Control onChange={e => { setState("network", e.target.value) }} type="text" placeholder="Enter network" />
                    </Form.Group>

                    <Form.Group controlId="VMos">
                        <Form.Label>OS</Form.Label>
                        <Form.Control onChange={e => { setState("os", e.target.value) }} type="text" placeholder="Enter OS" />
                    </Form.Group>

                    <Form.Group style={{ margin: "5%" }} controlId="VMdb">
                        <h3>Databases:</h3>
                        <Form.Check onChange={e => { setServicesState("influxdb") }} type="switch" id="custom-switch" label="InfluxDB" />
                        <Form.Check onChange={e => { setServicesState("mongodb") }} type="switch" id="custom-switch" label="MongoDB" />
                        <Form.Check onChange={e => { setServicesState("mysql") }} type="switch" id="custom-switch" label="MySQL" />
                        <Form.Check onChange={e => { setServicesState("postgresql") }} type="switch" id="custom-switch" label="PostgreSQL" />
                        <Form.Check onChange={e => { setServicesState("redis") }} type="switch" id="custom-switch" label="Redis" />
                    </Form.Group>

                    <Form.Group style={{ margin: "5%" }} controlId="VMweb">
                        <h3>Web servers:</h3>
                        <Form.Check onChange={e => { setServicesState("grafana") }} type="switch" id="custom-switch" label="Grafana" />
                        <Form.Check onChange={e => { setServicesState("nodered") }} type="switch" id="custom-switch" label="Node-RED" />
                        <Form.Check onChange={e => { setServicesState("apache") }} type="switch" id="custom-switch" label="Apache" />
                        <Form.Check onChange={e => { setServicesState("nginx") }} type="switch" id="custom-switch" label="Nginx" />
                        <Form.Check onChange={e => { setServicesState("tomcat") }} type="switch" id="custom-switch" label="Tomcat" />
                    </Form.Group>

                    <Form.Group style={{ margin: "5%" }} controlId="VMother">
                        <h3>Other:</h3>
                        <Form.Check onChange={e => { setServicesState("mqtt") }} type="switch" id="custom-switch" label="MQTT" />
                        <Form.Check onChange={e => { setServicesState("ssh") }} type="switch" id="custom-switch" label="SSH" />
                        <Form.Check onChange={e => { setServicesState("http") }} type="switch" id="custom-switch" label="HTTP" />
                        <Form.Check onChange={e => { setServicesState("https") }} type="switch" id="custom-switch" label="HTTPS" />
                        <Form.Check onChange={e => { setServicesState("ftp") }} type="switch" id="custom-switch" label="FTP" />
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