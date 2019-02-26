import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import './ProfessionSelection.css'

class ProfessionSelection extends Component {
  render() {
    return (
      <div className="ProfessionSelection">
      <div>
      <Button color="secondary" size="lg" tag={Link} to="/petowner">Pet Owner </Button></div>
      <p>Describe your own profile, so that other users can easily leave you your pet </p>
      <div><Button color="secondary" size="lg" tag={Link} to="/petsiter">Pet Sitter</Button></div>
      <p>Show and describe your pet so that no one will be surprised by his attitude and appearance</p>
      
      </div>
    )
  }
}

export default ProfessionSelection