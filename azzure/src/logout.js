import NavbarBasicExample from "./navbar";
import "./logout.css"

function Logout() {
    let cookies = document.cookie.split("; ");
    let sessionCookie = cookies.find((row) => row.startsWith("sessionCookie="));
    if (sessionCookie) {
        document.cookie = `${sessionCookie}; max-age=0`;
    }
    return (
        <>
            <NavbarBasicExample />
            <div className='logout-container'>
                <h2>Logout</h2>
                <p className='logout-body'>You have been logged out ! <br /> See you soon 👋</p>
            </div>
        </>
    );
}

export default Logout;