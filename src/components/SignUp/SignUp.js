import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import firebase from "firebase";

import "./SignUp.css";

class SignUp extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    error: null,
    success: null
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.password1 === this.state.password2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password1)
        .then(data => {
          this.props.history.push("/profession-selection");
          this.setState({ error: null, success: "Thank you" });
        })
        .catch(error => this.setState({ error: error, success: null }));
    } else {
      this.setState({
        error: new Error("Passwords do not match each other"),
        success: null
      });
    }
  };

  render() {
    return (
      <div className="SignUp">
        {this.state.error && (
          <p style={{ color: "red" }}>{this.state.error.message}</p>
        )}
        {this.state.success && (
          <p style={{ color: "green" }}>{this.state.success}</p>
        )}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup className="">
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="your email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="">
            <Label>Password</Label>
            <Input
              name="password1"
              type="password"
              placeholder="Don't forget!"
              value={this.state.password1}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="">
            <Label>Repeat Password</Label>
            <Input
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button>Sign In</Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
