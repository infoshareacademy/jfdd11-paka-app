import React, { Component } from 'react'
import firebase from 'firebase';

import './PopUpOwner.css'
import { current } from 'locutus/php/array';

class PopUpOwner extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    adress: '',
    phone: '',
    photo: '',

  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        const userId = currentUser.id
        const email = currentUser.email

        firebase
        .database()
        .ref(`users/${userId}`)
        .once('value')
        .then(snapshot => snapshot.val())
        .then(user => {
          if (user === null) {
            return;
          }
          this.setState({
            name: user.name,
            surname: user.surname,
            email: email,
            adress: user.adress,
            phone: user.phone,
            photo: user.photo,
          })
        })
      }
    })
  }
  render() {
    return (
      <div className="PopUpOwner">
      <h1>Owner Profile</h1>
      <p>photo: {this.state.photo}</p>
      <p>name: {this.state.name}</p>
      <p>surname: {this.state.surname}</p>
      <p>email: {this.state.email}</p>
      <p>adress: {this.state.adress}</p>
      <p>phone: {this.state.phone}</p>
      
      </div>
    )
  }
}

export default PopUpOwner
