import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './components/Root';
import './firebaseSetup';

import firebase from 'firebase';

 firebase.auth().createUserWithEmailAndPassword('bartosz.cytrowski+2@gmail.com', 'test1234');

 firebase.auth().signOut()
    firebase
  .auth()
  .signInWithEmailAndPassword('bartosz.cytrowski+1@gmail.com', 'test1234')
  .then(() => console.log('sign in successful'));

 firebase.auth().onAuthStateChanged(user => {
  console.log(user);
});

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
