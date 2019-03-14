import React, { Component } from "react";

import Chat from "../Chat";
import { Button } from "reactstrap";

import "./IconChat.css";
import { withAuth } from "../../context/AuthContext";

class IconChat extends Component {
  state = {
    isMenuOpen: false,
    animationEnabled: true
  };

  handleMenuToggle = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
        // animationEnabled: !state.animationEnabled
      };
    });
  };

  render() {
    if (this.props.authContext.user === null) {
      return null;
    }
    return (
      <>
        <div className="IconChat-wrapper">
          <div
            className={`IconChat-side-menu ${
              this.state.animationEnabled ? "animation-enabled" : ""
            } ${this.state.isMenuOpen ? "show" : "hide"}`}
          >
            <Chat />
          </div>
        </div>

        <div onClick={this.handleMenuToggle} className="IconChat-menu">
          <Button>Chat</Button>
        </div>
      </>
    );
  }
}

export default withAuth(IconChat);
