import React, { Component } from "react";
import firebase from "firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    success: null,
    activeTab: '1'
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
            height: '45vh'
          }}
        >
  
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
                flexDirection: "column"
              }}
            >
              <FormGroup>
                {/* <Label for="exampleEmail" /> */}
                <Input
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  id="exampleEmail"
      //   <ul>
      //     <li>Don't let your dog sit home alone!</li>
      //     <li>Earn extra while enjoying your time with doggos</li>
      //   </ul>

      //   <div className="buttons">
      //     <button>I have a dog</button>
      //     <button>I want to be a pet-sitter</button>
      //   </div>
      // </div> 
                  placeholder="Email Address"
                />
              </FormGroup>
      {/* //   <ul>
      //     <li>Don't let your dog sit home alone!</li>
      //     <li>Earn extra while enjoying your time with doggos</li>
      //   </ul>

      //   <div className="buttons">
      //     <button>I have a dog</button>
      //     <button>I want to be a pet-sitter</button>
      //   </div>
      // </div>  */}
              <FormGroup>
                {/* <Label for="
      //   <ul>
      //     <li>Don't let your dog sit home alone!</li>
      //     <li>Earn extra while enjoying your time with doggos</li>
      //   </ul>

      //   <div className="buttons">
      //     <button>I have a dog</button>
      //     <button>I want to be a pet-sitter</button>
      //   </div>
      // </div> 
      //   <ul>
      //     <li>Don't let your dog sit home alone!</li>
      //     <li>Earn extra while enjoying your time with doggos</li>
      //   </ul>

      //   <div className="buttons">
      //     <button>I have a dog</button>
      //     <button>I want to be a pet-sitter</button>
      //   </div>
      // </div> 
      //   <ul>
      //     <li>Don't let your dog sit home alone!</li>
      //     <li>Earn extra while enjoying your time with doggos</li>
      //   </ul>

      //   <div className="buttons">
      //     <button>I have a dog</button>
      //     <button>I want to be a pet-sitter</button>
      //   </div>
      // </div> examplePassword" /> */}
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
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Login;
