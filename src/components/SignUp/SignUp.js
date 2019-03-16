import React, { Component } from 'react'
import { Button, Form, FormGroup, Input,  } from 'reactstrap';
import { withRouter } from 'react-router-dom'

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
          this.props.history.push("/my-profile")
          this.setState({ error: null, success: "Thank you" })
        })
        .catch(error => this.setState({ error: error, success: null }));
    } else {
      this.setState({
        error: new Error("Passwords do not match each other"),
        success: null
      });
    }
  
}


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
              
            
      <div className="SignUp">
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
          <FormGroup className="signup"
          >


            <Input name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup >
          <FormGroup className="signup">
         
            <Input name="password1" type="password" placeholder="Password" value={this.state.password1} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup className="signup">
      
            <Input name="password2" type="password" placeholder="Repeat Password" value={this.state.password2} onChange={this.handleChange} />
          </FormGroup>

          <Button>Sign In</Button>
        </Form>
        
      </div> 
      </div>
          

      

      
    )
  }
}

export default withRouter(SignUp);