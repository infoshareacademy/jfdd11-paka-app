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
  // handleSubmit = event => {
  //   event.preventDefault();
  // }

  // handleChange = event => {
  //   const fieldAuthor = event.target.author;
  //   const value =
  //   event.target.type === 'checkbox'
  //   ? event.target.checked
  //   : event.target.value;

  //   this.state({
  //     [fieldAuthor]: value
  //   })
  // }


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
