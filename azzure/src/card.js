import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './card.css'


function CustomListGroup(props) {
    const nbItems = props.nbFields;
    const items = [];
    for (let i = 1; i <= nbItems; i++) {
        console.log('item' + i);
        items.push(<ListGroup.Item>{props['item' + i]}</ListGroup.Item>);
    }
    console.log(items);
    return (
        <ListGroup className="list-group-flush">
            {items.map((item) => item)}
        </ListGroup>
    );
}


function CardItem(props) {
    const nbItems = props.nbFields;

    return (
        <Card style={{ width: '18rem', margin: 'auto' }}>
            {/* <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1280px-Google_Images_2015_logo.svg.png" /> */}
            <i className={props.img} style={{ fontSize: '5rem', margin: 'auto', marginTop: '1rem' }}></i>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
            <CustomListGroup {...props} />
            {/* <CustomListGroup nbFields={nbItems} item0={props.item1} item1={props.item1} /> */}
        </Card>
    );
}

export default CardItem;