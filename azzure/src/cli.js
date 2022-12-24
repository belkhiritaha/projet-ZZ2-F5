import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllVMs } from './App';

function Cli(props) {

    const [cardID, setCardID] = useState(0);
    const [vms, setVms] = useState(props.user.vms);

    function VmCard(vm, user) {

        const [commandHistory, setCommandHistory] = useState([]);


        function handleCardClick(id) {
            if (cardID == id || vm.status == 0) {
                setCardID(0);
            }
            else {
                setCardID(id);
            }
        }

        function executeCommand(command) {
            if (command == 'help') {
                setCommandHistory([...commandHistory, command, 'Available commands:']);
                setCommandHistory([...commandHistory, 'help', 'clear', 'exit', 'ls', 'cd', 'cat', 'pwd']);
            }
            else if (command == 'clear') {
                setCommandHistory([]);
                console.log(commandHistory);
            }
            else if (command == 'exit') {
                setCardID(0);
            }
            else {
                setCommandHistory([...commandHistory, command]);
            }
            console.log(command);
        }

        return (
            <Card key={'cli-card' + vm._id} style={{ width:'18 rem', margin: 'auto', textAlign: 'center' }}>
                <i className={props.img} style={{ fontSize: '5rem', margin: 'auto', marginTop: '1rem' }}></i>
                <Card.Body onClick={() => {handleCardClick(vm._id)}}>
                    <Card.Title>{vm.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{vm.id}</Card.Subtitle>
                    <Card.Text>
                        {vm.description}
                    </Card.Text>
                    <h5 className="mr-sm-2">
                        {vm.status === 0 ? "Stopped" : "Running"}
                        <div className="status-circle" style={{ backgroundColor: vm.status === 0 ? "red" : "green" , boxShadow: vm.status === 0 ? "0 0 0.5vw 0.5vw rgba(255, 0, 0, 0.5)" : "0 0 0.5vw 0.5vw rgba(0, 255, 0, 0.5)" }}></div>
                    </h5>
                </Card.Body>

                <Collapse in={cardID == vm._id}>
                    <Card.Body>
                        <div className='terminal'>
                            <div className='terminal-header'>
                                <div className='terminal-header-button red'></div>
                                <div className='terminal-header-button yellow'></div>
                                <div className='terminal-header-button green'></div>
                            </div>
                            <div className='terminal-body' id='terminal-body'>
                                <div className='terminal-body-text'>
                                    <div className='terminal-body-text-line'>Welcome to the aZZure CLI</div>
                                    <div className='terminal-history'>
                                        {commandHistory.map((command, index) => {
                                            return (
                                                <div key={index} className='terminal-history-line'>
                                                    <div className='terminal-prompt'>{user}@{vm.name.replace(/\s/g, '_')}:~$</div>
                                                    <div className='terminal-history-command'>{command}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className='terminal-line'>
                                        <div className='terminal-prompt'>{user}@{vm.name.replace(/\s/g, '_')}:~$</div>

                                        <input type='text' className='terminal-input' onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                executeCommand(e.target.value);
                                                e.target.value = '';
                                            }
                                            }}
                                            placeholder='Enter a command'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <style type="text/css">
                            {`
                            .terminal {
                                width: 100%;
                                height: 100%;
                                background-color: #000;
                                border-radius: 5px;
                                word-wrap: break-word;
                            }
                            .terminal-header {
                                width: 100%;
                                height: 30px;
                                background-color: #000;
                                display: flex;
                                flex-direction: row;
                                justify-content: flex-end;
                                align-items: center;
                            }
                            .terminal-header-button {
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                margin: 0 5px;
                            }
                            .red {
                                background-color: #ff0000;
                            }
                            .yellow {
                                background-color: #ffff00;
                            }
                            .green {
                                background-color: #00ff00;
                            }
                            .terminal-body {
                                width: 100%;
                                height: calc(100% - 30px);
                                background-color: #000;
                                overflow-y: hidden;
                                overflow-x: hidden;
                                padding: 10px;
                            }
                            .terminal-body-text {
                                width: 100%;
                                height: 100%;
                                color: #fff;
                                font-family: monospace;
                                font-size: 14px;
                                line-height: 20px;
                            }
                            .terminal-body-text-line {
                                width: 100%;
                                height: 20px;
                                display: flex;
                                flex-direction: row;
                                justify-content: flex-start;
                                align-items: center;
                            }
                            .terminal-history {
                                width: 100%;
                                height: 100%;
                                display: flex;
                                flex-direction: column;
                                justify-content: flex-start;
                                align-items: flex-start;
                            }
                            .terminal-history-line {
                                width: 100%;
                                height: 20px;
                                display: flex;
                                flex-direction: row;
                                justify-content: flex-start;
                                align-items: center;
                            }
                            .terminal-prompt {
                                color: #00ff00;
                            }
                            .terminal-history-command {
                                color: #fff;
                                padding: 0 5px;
                                word-wrap: break-word;
                            }
                            .terminal-line {
                                width: 100%;
                                height: 20px;
                                display: flex;
                                flex-direction: row;
                                justify-content: flex-start;
                                align-items: center;
                                word-wrap: break-word;
                            }
                            .terminal-input {
                                width: 100%;
                                height: 100%;
                                background-color: #000;
                                border: none;
                                color: #fff;
                                font-family: monospace;
                                font-size: 14px;
                                line-height: 20px;
                                padding: 0 5px;
                                word-wrap: break-word;
                            }
                            .terminal-input:focus {
                                outline: none;
                            }
                            `}
                        </style>
                    </Card.Body>
                </Collapse>
            </Card>
        )
    }

    function refreshVms() {
        getAllVMs(props.user).then((data) => {
            let newVms = [];
            data.forEach((vm) => {
                newVms.push(vm);
            });
            setVms(newVms);
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h1>Select a VM</h1>
                <Button style={{ margin: "1%", width: "25%" }} variant="primary" className="mr-sm-2" onClick={refreshVms}>
                    Refresh
                </Button>
            </div>
            <Row>

                {vms.map(vm => {
                    return (
                        <Collapse key={"collapse"+vm._id} in={(cardID == vm._id) && (vm.status == 1) || (cardID == 0)}>
                            <div className='col'>
                                {VmCard(vm, props.user.username)}
                            </div>
                        </Collapse>
                    )
                })}

            </Row>
        </>
    )


}

export default Cli;