import React, { Component } from 'react'

import './PetOwnerWizard.css'
import PetOwner from '../PetOwner';
import PetOwnerFeatures from '../PetOwnerFeatures';

import firebase from 'firebase'

class PetOwnerWizard extends Component {
  state = {
    name: '',
    surname: '',
    dogsname: '',
    age: null,
    gender: '',
    breed: '',
    description: '',
    dogWalking: false,
    dayCare: false,
    dayNightCare: false,
    dropIn: false
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, surname, dogsname, age, gender, breed, description, dogWalking, dayCare, dayNightCare, dropIn } = this.state

    console.log('handlesubmit', this.state)
    // firebase
    //   .database()
    //   .ref('petowners')
    //   .push({ name, surname, dogsname, age, gender, breed, description, dogWalking, dayCare, dayNightCare, dropIn })

  }


  handleNameChange = (name) => {
    this.setState({ name })
  }

  handleSurnameChange = (surname) => {
    this.setState({ surname })

  }

  handleDogsname = (dogsname) => {
    this.setState({ dogsname })
  }

  handleAge = (age) => {
    this.setState({ age })
  }

  handleGender = (gender) => {
    this.setState({ gender })
  }

  handleBreed = (breed) => {
    this.setState({ breed })
  }

  handleDescriptionChange = (description) => {
    this.setState({ description })

  }

  handleDogWalking = (dogWalking) => {
    this.setState({ dogWalking })

  }

  handleDayCare = (dayCare) => {
    this.setState({ dayCare })

  }

  handleDayNightCare = (dayNightCare) => {
    this.setState({ dayNightCare })

  }

  handleDropIn = (dropIn) => {
    this.setState({ dropIn })
  }

  render() {
    return (
      <div className="PetOwnerWizard">
        <form onSubmit={this.handleSubmit}>
          <PetOwner
            onDescriptionChange={this.handleDescriptionChange}
            onBreedChange={this.handleBreed}
            onGenderChange={this.handleGender}
            onAgeChange={this.handleAge}
            onDogsnameChange={this.handleDogsname}
            onSurnameChange={this.handleSurnameChange}
            onNameChange={this.handleNameChange}

          />
          <PetOwnerFeatures
            onDogWalking={this.handleDogWalking}
            onDayCare={this.handleDayCare}
            onDayNightCare={this.handleDayNightCare}
            onDropIn={this.handleDropIn}
          />
          <button className="submit" type="submit" >Submit</button>
        </form>





      </div>
    )
  }
}

export default PetOwnerWizard
