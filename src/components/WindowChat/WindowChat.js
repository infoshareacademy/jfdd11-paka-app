import React, { Component } from 'react'

import './WindowChat.css'

import { NavLink } from 'react-router-dom';
import { withAuth } from '../../context/AuthContext';
import Chat from '../Chat';



class WindowChat extends Component {
  render() {
    return (
      <div className="WindowChat">
      
      <Chat />
     
      </div>
    )
  }
}

export default WindowChat
