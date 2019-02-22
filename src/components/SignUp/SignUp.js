import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Alert } from 'reactstrap';


import './SignUp.css'

class SignUp extends Component {
  render() {
    return (


      <Form>
        <FormGroup className="">
          <Label for="exampleEmail" className="mr-sm-2">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="your email" />
        </FormGroup>
        <FormGroup className="">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Don't forget!" />
        </FormGroup>
        <FormGroup className="">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Please repeat your password" />
        </FormGroup>
        <Button>Sign In</Button>
  
      </Form>
    )
  }
}

export default SignUp
