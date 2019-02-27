import React, { Component } from 'react'

import './PetSitterWizard.css'

import PetSitterFeatures from '../PetSitterFeatures';

import PetSitter from '../PetSitter';

class PetSitterWizard extends Component {

  state= {
  name: '',
  age: '',
  adress: '',
  features: []

  }

  handleSubmit = () => {
    console.log('handlesubmit')
  }

  handleNameChange = (name) => {
    console.log(name)
    this.setState({ name })
    
  }

  handleSurnameChange = (surname) => {
    this.setState({ surname })
  }

  handleAgeChange = (age) => {
    this.setState({ age })
    
  }

  handleAdressChange = (adress) => {
    this.setState({ adress })
    
  }

  render() {
    return (
      // <Switch>
      // <Route exact path="/petsitter" render={() => {
      //   return <PetSitter onNameChange={this.handleNameChange} />
      // }} />
      // <Route exact path="/petsitter/petsitterfeatures" render={() => {
      //   return <PetSitterFeatures onSubmit={this.handleSubmit} />
      // }} />
      // </Switch>
      <>
      <PetSitter 
      onNameChange={this.handleNameChange} 
      onSurnameChange={this.handleSurnameChange}
      onAgeChange={this.handleAgeChange}
      onAdressChange={this.handleAdressChange}
      />
      <PetSitterFeatures onSubmit={this.handleSubmit} />
      </>
    )
  }
}

export default PetSitterWizard
