import React, { Component } from 'react'
import firebase from 'firebase';
import { Link } from 'react-router-dom';

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
            name: user.name,
            surname: user.surname,
            email: user.email,
            adress: user.adress,
            phone: user.phone,
            photo: user.photo,
            
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
      <p>age: {this.state.age}</p>
    
    
      <Link to="/map">Back</Link>
      </div>
      
    )
  }
}

export default PopUpOwner
