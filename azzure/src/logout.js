import NavbarBasicExample from "./navbar";

function Logout() {
    let cookies = document.cookie.split("; ");
    let sessionCookie = cookies.find((row) => row.startsWith("sessionCookie="));
    if (sessionCookie) {
        document.cookie = `${sessionCookie}; max-age=0`;
    }
    return (
        <>
            <NavbarBasicExample />
            <div className='container'>
                <h2>Logout</h2>
                <p>You have been logged out.</p>
            </div>
        </>
    );
}

export default Logout;