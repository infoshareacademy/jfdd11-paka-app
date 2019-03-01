import React, { Component } from 'react'
import firebase from 'firebase';

import './PopUpOwner.css'


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
    const { userId } = this.props.match.params;

    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
       

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
            name: user.first_name,
            surname: user.last_name,
            email: user.email,
            adress: user.city,
            phone: user.phone,
            photo: user.avatar,
            breed: user.breed,
            dogsname: user.dogsname,
            age: user.age,
          })
        })
      }
    })
  }
  render() {
    return (
      <div className="PopUpOwner">
      <h1>Owner Profile</h1>
     
      <p><img src={this.state.photo}/></p>
      <p>name: {this.state.name}</p>
      <p>surname: {this.state.surname}</p>
      <p>email: {this.state.email}</p>
      <p>adress: {this.state.adress}</p>
      <p>phone: {this.state.phone}</p>
      <p>dogs name: {this.state.dogsname}</p>
      <p>breed: {this.state.breed}</p>
      <p>dogs age: {this.state.age}</p>
    
      </div>
    )
  }
}

export default PopUpOwner
