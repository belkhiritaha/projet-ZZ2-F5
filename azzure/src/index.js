import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, getUser} from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "https://kit.fontawesome.com/68fc273f7b.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './notfound';
import Login from './login';
import Register from './register';
import { useState } from 'react';

function Router() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const username = getUser().then(username => {
        setUser(username);
        setLoading(false);
    });

    if (loading) {
        return (
            <div className="lds-dual-ring"></div>
        )
    }

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route index path="/home" element={<App  page='home' user={user} />}/>
                    <Route path="/create" element={<App page='create' />}>
                        <Route path=":id" element={<App page='create' id={this} user={user} /> }/>
                    </Route>
                    <Route path="/manage" element={<App page='manage' user={user} />}/>
                    <Route path="/login" element={<Login user={user} />} />
                    <Route path="register" element={<Register user={user}/>}/>
                    <Route path="/" element={<App page='home' user={user}/>}/>
                    <Route path="/*" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
