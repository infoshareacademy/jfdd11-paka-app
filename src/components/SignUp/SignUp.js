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
          <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
        </FormGroup>
        <FormGroup className="">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
        </FormGroup>
        <Button>Sign In</Button>
     
      <Alert color="primary">
        This is a primary alert — check it out!
      </Alert>
      </Form>
    )
  }
}

export default SignUp
