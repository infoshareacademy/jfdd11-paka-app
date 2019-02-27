import React, { Component } from 'react'
import firebase from 'firebase'

import './UserProfile.css'

class UserProfile extends Component {
  state = {
    users: []
  }

  componentDidMount() {
     
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        firebase
        .database()
        .ref(`users`)
        .once('value')
        .then(snapshot => snapshot.val())
        .then(users => {
          console.log(Object.values(users))
          this.setState({ users: Object.values(users) })
        
        })
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="UserProfile">
      <h1>Check out fellow users</h1>
      <div>
        {this.state.users.map(user => (
          <div key={user.id}><img src={user.avatar} alt='user'></img>{user.first_name}</div>
  ))}
      </div>
      </div>
    )
  }
}

export default UserProfile
