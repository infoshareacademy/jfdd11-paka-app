import React, { Component } from "react";
import { Input } from 'reactstrap'
import Auth from "../Auth/Auth";
import "./Chat.css";
import { withAuth } from "../../context/AuthContext";
import firebase from "firebase";
import { Link } from 'react-router-dom'
import moment from "moment";





class Chat extends Component {
  state = {
    message: "",
    messages: null,
    users: null
  };

  readMessages = snapshot => {
    this.setState({
      messages: snapshot.val()
    });
  };

  readUsers = snapshot => {
    this.setState({
      users: snapshot.val()
    });
  };
  componentDidMount() {
    firebase
      .database()
      .ref("messages")
      .orderByChild("createdAt")
      .limitToLast(20)
      .on("value", this.readMessages);

    firebase
      .database()
      .ref("users")
      .on("value", this.readUsers);
  }
  componentWillUnmount() {
    firebase
      .database()
      .ref("messages")
      .off("value", this.readMessages);

    firebase
      .database()
      .ref("users")
      .off("value", this.readUsers);
  }

  handleMessageChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // Remember that setState is async
    this.setState({
      message: ""
    });

    firebase
      .database()
      .ref("messages")
      .push({
        content: this.state.message,
        authorId: this.props.authContext.user.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
  };

  render() {
    const { users } = this.state;
    const messagesArray = Object.entries(this.state.messages || {})
      .map(([id, value]) => ({ id, ...value }))
      .reverse();

    return (
      <div className="Chat">
        <h1 style={{ fontSize: '30px' }}>Chat</h1>
        <Auth cover={() => <p>Chat is only for logged in users.</p>}>
          <form onSubmit={this.handleSubmit}>
            <Input className='input' placeholder="Chat with fellow dog-lovers"
              value={this.state.message}
              onChange={this.handleMessageChange}
            />
          </form>
        </Auth>

        <div className='chat' >
          {messagesArray.map(message => (
            <div style={{}} key={message.id}>
              <div >
        
                <strong
                  style={{
                    color: "black",
                    fontSize: "25px",
                    marginRight: "10px",
                    width: "60vw",
                    paddingLeft: '6px'
                  }}
                >
                <Link to={`/users/${message.authorId}`}>
                {(users &&
                    users[message.authorId] &&
                    users[message.authorId].name) ||
                    'Unnamed'}{" "}
                  {(users &&
                    users[message.authorId] &&
                    users[message.authorId].surname) ||
                   ''}
                </Link>
                  
                </strong>
                <p style={{ fontSize: "10px", paddingLeft: '6px'}}>
                  {moment(message.createdAt).fromNow()}
                </p>
              
              </div >

             
              <p style={{ background: "#f1f3f5", borderRadius: "8px 8px 8px 8px", padding: '6px'}}>{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuth(Chat);
