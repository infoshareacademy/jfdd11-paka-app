import React, { Component } from 'react'

import './PetSitterWizard.css'

import PetSitterFeatures from '../PetSitterFeatures';

import PetSitter from '../PetSitter';

import firebase from 'firebase';



class PetSitterWizard extends Component {

  state = {
   
    name: '',
    age: '',
    adress: '',
    description: '',
    schedule: false,
    daycare: false,
    housesitting: false,
    visits: false

  }

  

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, surname, age, adress, description, schedule, daycare, housesitting, visits, file } = this.state
    
    firebase
      .database()
      .ref('user')
      .push({ name, surname, age, adress, description, schedule, daycare, housesitting, visits })

    // More info about uploading files:
    // https://firebase.google.com/docs/storage/web/upload-files
    const storageRef = firebase.storage().ref();
    const ref = storageRef.child('testowe.jpg');
    ref.put(file)

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

  handleFileSelected = (file) => {
    this.setState({ file })
  }

  handleAdressChange = (adress) => {
    this.setState({ adress })

  }

  handleDescriptionChange = (description) => {
    this.setState({ description })

  }

  handleScheduleChange = (schedule) => {
    this.setState({ schedule })
  }

  handleDaycareChange = (daycare) => {
    this.setState({ daycare })
  }

  handleHousesittingChange = (housesitting) => {
    this.setState({ housesitting })
  }

  handleVisitsChange = (visits) => {
    this.setState({ visits })
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
        <form onSubmit={this.handleSubmit}>
          <PetSitter
            onNameChange={this.handleNameChange}
            onSurnameChange={this.handleSurnameChange}
            onAgeChange={this.handleAgeChange}
            onAdressChange={this.handleAdressChange}
            onDescriptionChange={this.handleDescriptionChange}
            onFileSelected={this.handleFileSelected}
          />
          <PetSitterFeatures
            onSubmit={this.handleSubmit}
            onScheduleChange={this.handleScheduleChange}
            onDaycareChange={this.handleDaycareChange}
            onHousesittingChange={this.handleHousesittingChange}
            onVisitsChange={this.handleVisitsChange}
          />
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}

export default PetSitterWizard
