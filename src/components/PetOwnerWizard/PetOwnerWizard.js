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
    age: '',
    gender: '',
    breed: '',
    description: '',
    dogWalking : false,
    dayCare : false,
    dayNightCare : false,
    dropIn : false
  };

  handleSubmit = () => {
      const { name, surname, dogsname, age, gender, breed, dogWalking, dayCare, dayNightCare, dropIn } = this.state
      
      console.log('handlesubmit', this.state)
       firebase
       .database()
       .ref('users')
       .push({ name, surname, dogsname, age, gender, breed, dogWalking, dayCare, dayNightCare, dropIn })
     
    }
  
  
    handleNameChange = (name) => {
      console.log(name)
      this.setState({ name })
    }
  
    handleSurnameChange = (surname) => {
      this.setState({ surname })
  
    }

    handleDogsname= (dogsname) => {
      this.setState({ dogsname })
    }
  
    handleAge= (age) => {
      this.setState({ age })
    }
  
    handleGender= (gender) => {
      this.setState({ gender })
    }
  
    handleBreed= (breed) => {
      this.setState({ breed })
    }
  
    handleDescriptionChange = (description) => {
      this.setState({ description })
      
    }

    handleDogWalking = (dogWalking) => {
      this.setState({dogWalking})
  
    }
  
    handleDayCare = (dayCare) => {
      this.setState({dayCare})
  
  }
  
  handleDayNightCare = (dayNightCare) => {
    this.setState({dayNightCare})
  
  }
  
  handleDropIn = (dropIn) => {
    this.setState({dropIn})
  }

  render() {
    return (
      <div className="PetOwnerWizard">
    
        <>
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
          onSubmit={this.handleSubmit}
          onDogWalking={this.handleDogWalking}
          onDayCare={this.handleDayCare}
          onDayNightCare={this.handleDayNightCare}
          onDropIn={this.handleDropIn}
          />
          

        </>
      </div>
    )
  }
}

export default PetOwnerWizard
