import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import UploadForm, { Switch } from './form';
import './card.css'



function CustomListGroup(props) {
    const nbItems = props.nbFields;

    const [open, setOpen] = useState(false);

    const items = [];

    for (let i = 1; i <= nbItems; i++) {
        items.push(<ListGroup.Item key={items.length + 1} onClick={() => {setOpen(!open)}}>{props['item' + i]}</ListGroup.Item>);
        items.push(<Collapse key={items.length + 1} in={open}>
                        <div id="example-collapse-text">
                            <UploadForm />
                            <Switch />
                        </div>
                    </Collapse>);
    }
    // console.log(items);
    return (
        <ListGroup className="list-group-flush">
            {items}
        </ListGroup>
    );
}


function CardItem(props) {
    const nbItems = props.nbFields;

    return (
        <Card style={{ width: '18rem', margin: 'auto' }}>
            <i className={props.img} style={{ fontSize: '5rem', margin: 'auto', marginTop: '1rem' }}></i>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
            <CustomListGroup {...props} />
        </Card>
    );
}


export default CardItem;