import React, { Component } from 'react'


import Auth from '../Auth/Auth';
import './Chat.css'
import { withAuth } from '../../context/AuthContext';
import firebase from 'firebase';


class Chat extends Component {
  state = {
   message: '',
   
    
  }
  

  handleMessageChange = event => {
    this.setState({
      message: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
   

    firebase
    .database()
    .ref('messages')
    .push({
      content: this.state.message,
      authorId: this.props.authContext.user.uid,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
  };
 

  render() {
   
    return (
      <div className="Chat">
      <h1>Chat</h1>
      <Auth cover={() => <p>Chat is only for logged in users.</p>}>
      <form onSubmit={this.handleSubmit}>
      <input value={this.state.message}
      onChange={this.handleMessageChange}/>
      </form>
      </Auth>

    </div>
    );
  }
}

export default withAuth(Chat);
