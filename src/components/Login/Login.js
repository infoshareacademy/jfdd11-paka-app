import React, { Component } from "react";
import homezoonew from "../images/homezoonew.png";
import { Button } from 'reactstrap';
import firebase from "firebase";

import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    success: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data =>
        this.setState({ error: null, success: "Logged-in successfully" })
      )
      .catch(error => this.setState({ error: error, success: null }));
  };

  render() {
    return (
      <div className='login_login-container'>
        <div className="logo">
          <img src={homezoonew} alt="logo" />
        </div>
        <h1>Log in here</h1>
        <div className="row">
          <form onSubmit={this.handleSubmit} className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <Button>
              Log in
            </Button>
          </form>
        </div>
        <div className="signup-container">
          <h1>Don't have account?</h1>
          <Button><a className='login_sign-up-button' href='http://localhost:3000/sign-up'>
            Sign up
          </a></Button>
        </div>
       
     
      </div>
    );
  }
}

export default Login;

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
