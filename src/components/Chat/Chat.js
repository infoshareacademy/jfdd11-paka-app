import React, { Component } from 'react'

import './Chat.css'

class Chat extends Component {
  state = {
    messages: [
      {
        id: '',
        author: '',
        messageText: '',
      },
    ],
  }


  render() {
    return (
      <div className="Chat">
      <h1>Messages</h1>
      <p>
        {this.state.messages.map(message =>
          <p key={message.id}>
          <p>{message.author}</p>
          <p>{message.messageText}</p>
          </p>)}
      </p>

    </div>
    );
  }
}

export default Chat
