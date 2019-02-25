import React, { Component } from "react";
import homezoonew from "../images/homezoonew.png";

import "./Login.css";

class Login extends Component {
  render() {
    return (
      <>
        <h1>Log in here</h1>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
          </form>
        </div>
        <div className="signup-container">
          <h1>Don't have account?</h1>
          <button>Sign up!</button>
        </div>
      </>
    );
  }
}

export default Login;

{
  /* <div className="login">
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
      </div> */
}
