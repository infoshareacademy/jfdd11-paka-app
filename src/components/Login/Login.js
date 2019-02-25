import React, { Component } from "react";
import homezoonew from "../images/homezoonew.png";

import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="logo">
          <img src={homezoonew} alt="logo" />
        </div>

        <ul>
          <li>Don't let your dog sit home alone!</li>
          <li>Earn extra while enjoying your time with doggos</li>
        </ul>

        <div className="buttons">
          <button>I have a dog</button>
          <button>I want to be a pet-sitter</button>
        </div>
      </div>
    );
  }
}

export default Login;
