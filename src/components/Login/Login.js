import React, { Component } from "react";
import firebase from "firebase";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import homezoonew from "../images/homezoonew.png";
import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    success: null,
    activeTab: "1"
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggle = tab => {
    this.setState({
      activeTab: tab
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data =>
        this.setState({ error: null, success: "Logged-in successfully" })
      )
      .then(data => {
        this.setState({ error: null, success: "Thank you" });
        this.props.history.push("/users");
      })
      .catch(error => this.setState({ error: error, success: null }));
  };

  render() {
    return (
      <div
        className="login-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "0 auto",
          width: "70vw",
          height: '45vh'
        }}
      >
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
        <div className="Login">
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error.message}</p>
          )}
          {this.state.success && (
            <p style={{ color: "green" }}>{this.state.success}</p>
          )}
          <Form
            onSubmit={this.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
          
            <FormGroup className="">
              <Input
                onChange={this.handleChange}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup className="">
              <Input
                onChange={this.handleChange}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Password"
              />
            </FormGroup>
            <Button>Log in</Button>
          </Form>
        </div>
        </div> 
        {/* <div className="logo">
            <img className="login-logo" src={homezoonew} alt="logo" />
            <h1
              style={{
                color: "#f36f5a",
                fontFamily: 'monospace',
                fontWeight: "bold",
                fontSize: "50",
                lineHeight: "0"
              }}
            >
              HomeZoo
            </h1>
          </div> */}
      </div>
    );
  }
}

export default withRouter(Login);
