import './App.css';
import NavbarBasicExample from './navbar';

function NotFound(props) {
    // return navbar
    return (
        <>
            <NavbarBasicExample />
            <div className='not-found'>
                    <img src='https://img.freepik.com/premium-vector/website-page-found-error-robot-character-broken-chatbot-mascot-disabled-site-technical-work_502272-1888.jpg' alt=''/>
                    <h1>Page not found</h1>
            </div>
        </>
    );
}

export default NotFound;
