import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './components/Root';
import './firebaseSetup';

import AuthContextProvider from './context/AuthContext';





ReactDOM.render(
    <AuthContextProvider>
        <Root />
    </AuthContextProvider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
