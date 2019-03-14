import React, { Component } from "react";
import firebase from "firebase";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
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
          height: '45vh',
          position: 'absolute',
      top: '-45px'
        }}
      >
        <div className="Login">
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error.message}</p>
          )}
          {this.state.success && (
            <p style={{ color: "green" }}>{this.state.success}</p>
          )}
         <Form onSubmit={this.handleSubmit}
         style={{
          display: "flex",
          flexDirection: "column"
          
         }}>
          
            <FormGroup className="Login-login">
              <Input
                onChange={this.handleChange}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup className="Login-login">
              <Input
                onChange={this.handleChange}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Password"
              />
            </FormGroup>
            <Button>Log in</Button>
            {/* {this.state.error && (
              <p className="singn-fail">
                Log-in failed. The given email address or password are invalid.</p>
            )}
            {this.state.success && <Redirect to="/users" />} */}
          </Form>
        </div>
        </div> 
  
    );
  }
}

export default withRouter(Login);
