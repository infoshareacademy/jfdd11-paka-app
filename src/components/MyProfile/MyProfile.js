import React, { Component } from 'react'
import './MyProfile.css';
import firebase from 'firebase';

class MyProfile extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    address: '',
    phone: '',
    photo: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        const userId = currentUser.uid;
        const email = currentUser.email;
        console.log(userId)
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
              address: user.adress,
              phone: user.phone,
              photo: user.photo
            });
          });
      }
    });
  }

  render() {
    console.log(this.state.name)
    return (
      <div className="MyProfile">
        <h1>My Profile</h1>
        <p>Name: {this.state.name}</p>
        <p>Surname: {this.state.surname}</p>
        <p>Email: {this.state.email}</p>
       <p>{this.state.address}</p>
      </div>
    );
  }
}


export default MyProfile
