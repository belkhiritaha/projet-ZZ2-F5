import Col from 'react-bootstrap/Col';

function SidebarItem(props) {
    return (
        <Col>
            <a href={props.link}>{props.name}</a>
        </Col>
    );
}

function Sidebar() {
    return (
        <Col xs={2}>
            <SidebarItem name="Home" link="/" />
            <SidebarItem name="About" link="/about" />
            <SidebarItem name="Contact" link="/contact" />
            <SidebarItem name="Dashboard" link="/dashboard" />
            <SidebarItem name="My VMs" link="/vm" />
        </Col>
    );
}

export default Sidebar;