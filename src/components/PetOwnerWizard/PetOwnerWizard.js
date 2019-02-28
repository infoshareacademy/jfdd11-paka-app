import React, { Component } from 'react'

import './PetOwnerWizard.css'
import PetOwner from '../PetOwner';
import PetOwnerFeatures from '../PetOwnerFeatures';

import firebase from 'firebase'

class PetOwnerWizard extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    adress: '',
    phone: '',
    photo: '',
    dogWalking : false,
    dayCare : false,
    dayNightCare : false,
    dropIn : false
  };

  handleSubmit = () => {
      const { name, surname, email, adress, phone, photo, dogWalking, dayCare, dayNightCare, dropIn } = this.state
      
      console.log('handlesubmit', this.state)
       firebase
       .database()
       .ref('users')
       .push({ name, surname, email, adress, phone, photo, dogWalking, dayCare, dayNightCare, dropIn })
     
    }
  
  handleChange = event => {
    const fieldName = event.target.name;
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    this.setState({
      [fieldName]: value,
    });
  };



  render() {
    return (
      <div className="PetOwnerWizard">
    
        <>
          <PetOwner
          

          />
          <PetOwnerFeatures
          onSubmit={this.handleSubmit}
          onDogWalking={this.handleChange}
          nDayCare={this.handleChange}
          onDayNightCare={this.handleChange}
          onDropIn={this.handleChange}
          />
          

        </>
      </div>
    )
  }
}

export default PetOwnerWizard
