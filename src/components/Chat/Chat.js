import React, { Component } from 'react';

import Auth from '../Auth/Auth';
import './Chat.css';
import { withAuth } from '../../context/AuthContext';
import firebase from 'firebase';
import moment from 'moment'
import { width } from 'window-size';

class Chat extends Component {
  state = {
    message: '',
    messages: null,
    users: null,
  };

  readMessages = snapshot => {
    this.setState({
      messages: snapshot.val(),
    });
  };

  readUsers = snapshot => {
    this.setState({
      users: snapshot.val(),
    });
  };
  componentDidMount() {
    firebase
      .database()
      .ref('messages')
      .orderByChild('createdAt')
      .limitToLast(20)
      .on('value', this.readMessages);

    firebase
      .database()
      .ref('users')
      .on('value', this.readUsers);
  }
  componentWillUnmount() {
    firebase
      .database()
      .ref('messages')
      .off('value', this.readMessages);

    firebase
      .database()
      .ref('users')
      .off('value', this.readUsers);
  }

  handleMessageChange = event => {
    this.setState({
      message: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // Remember that setState is async
    this.setState(({
      message: ''
    }))

    firebase
      .database()
      .ref('messages')
      .push({
        content: this.state.message,
        authorId: this.props.authContext.user.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
  };

  render() {
    const { users } = this.state;
    const messagesArray = Object.entries(this.state.messages || {}).map(
      ([id, value]) => ({ id, ...value })
    ).reverse();

    return (
      <div className="Chat">
        <h1>Chat</h1>
        <Auth cover={() => <p>Chat is only for logged in users.</p>}>
          <form onSubmit={this.handleSubmit}>
            <input
              value={this.state.message}
              onChange={this.handleMessageChange}
            />
          </form>
        </Auth>

        <div>
          {messagesArray.map(message => (

            <div key={message.id}>

              <p >
                <strong style={{ color: 'red', fontSize: '25px' }}>
                  {(users &&
                    users[message.authorId] &&
                    users[message.authorId].name) ||
                    message.authorId}
                </strong>
              </p>
              <p>
                {moment(message.createdAt).fromNow()}
              </p>
              {message.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuth(Chat);