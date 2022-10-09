import Col from 'react-bootstrap/Col';
import './sidebar.css';

function SidebarItem(props) {
    return (
        <Col className='sidebar-item'>
            <a href={props.link}><i className={props.img}></i> {props.name}</a>
        </Col>
    );
}

function Sidebar() {
    return (
        <Col xs={2}>
            <SidebarItem name="Home" link="/" img="fas fa-home" />
            <SidebarItem name="About" link="/about" img="fas fa-info-circle" />
            <SidebarItem name="Contact" link="/contact" img="fas fa-envelope" />
            <SidebarItem name="Dashboard" link="/dashboard" img="fas fa-chart-line" />
            <SidebarItem name="My VMs" link="/vm" img="fas fa-desktop" />
        </Col>
    );
}

export default Sidebar;