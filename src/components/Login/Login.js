import React, { Component } from "react";
import homezoonew from "../images/homezoonew.png";
import firebase from "firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
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
      .then(data =>
        this.setState({ error: null, success: "Logged-in successfully" })
      )
      .then(data => {
        this.props.history.push("/myprofile");
        this.setState({ error: null, success: "Thank you" });
      })
      .catch(error => this.setState({ error: error, success: null }));
  };

  render() {
    return (
      <div>
        <div
          className="login-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "0 auto",
            width: "70vw",
            height: "70vh"
          }}
        >
          <div style={{ textAlign: "center" }} className="logo">
            <img className="login-logo" src={homezoonew} alt="logo" />
            <h1
              style={{
                color: "#f36f5",
                fontFamily: "Chango",
                fontWeight: "bold",
                color: "#f36f5a",
                fontSize: "50",
                lineHeight: "0"
              }}
            >
              HomeZoo
            </h1>
          </div>
          <div className="Login-container">
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
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <FormGroup>
                <Label for="exampleEmail" />
                <Input
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="email address"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword" />
                <Input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password"
                />
              </FormGroup>
              <Button>Log in</Button>
            </Form>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div
          className="Sign-up-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {" "}
          
            <p
              style={{
                fontSize: 15
              }}
            >
              Don't have account?          
              <Link to="/sign-up"> {' '}     Sign up</Link>
            </p>
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
