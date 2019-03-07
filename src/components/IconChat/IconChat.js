import React, { Component } from 'react'
import WindowChat from '../WindowChat';
import paw from '../images/paw.png';
import Chat from '../Chat';

import './IconChat.css'


class IconChat extends Component {
  state = {
    isMenuOpen: false,
    animationEnabled: false
  }

  handleMenuToggle = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen,
        animationEnabled: !state.animationEnabled
  
      }
    })
  }



  render() {
    return (
      <>
        <div className="IconChat-wrapper">
          <div
            className={`IconChat-side-menu ${this.state.animationEnabled ? 'animation-enabled' : ''}${this.state.isMenuOpen
              ? "show"
              : "hide"}` 
            }
           
          >
          <Chat />
            
          </div>

        </div>

        <div onClick={this.handleMenuToggle} className="IconChat-menu">
       ...
          
        </div>
      </>

    )
  }
}

export default IconChat
