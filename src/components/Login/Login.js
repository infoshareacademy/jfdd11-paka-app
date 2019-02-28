import React, { Component } from "react";
import homezoonew from "../images/homezoonew.png";
import firebase from "firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from 'react-router-dom';

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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => this.setState({ error: null, success: 'Logged-in successfully' }))
      .then(data => {
        this.props.history.push("/myprofile")
        this.setState({ error: null, success: "Thank you" })
      })
      .catch(error => this.setState({ error: error, success: null }));
  };

  render() {
    return (
      <div className="login-wrapper">
      <div className="logo">
          <img className='login-logo' src={homezoonew} alt="logo" />
        </div>
        <div className="Login-container">
        {this.state.error && (
        <p style={{ color: 'red' }}>{this.state.error.message}</p>
      )}{this.state.success && (
        <p style={{ color: 'green' }}>{this.state.success}</p>
      )}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input onChange={this.handleChange}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input onChange={this.handleChange}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password placeholder"
              />
            </FormGroup>
            <Button>Log in</Button>
          </Form>
        </div>
        <div className="Sign-up-container">
          <h1>Don't have account?</h1>

          <Button tag={Link} to="/sign-up">
           Sign up
          </Button>
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
