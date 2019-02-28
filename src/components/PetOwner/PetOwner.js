import React, { Component } from 'react'

import './PetOwner.css'


const initialState = {
  name: '',
  surname: '',
  dogsname: '',
  age: '',
  gender: '',
  breed: '',
  description: ''
};

class PetOwner extends Component {
  state = initialState;
  
  handleName = (event) => {
    const { onNameChange } = this.props
    onNameChange && onNameChange(event.target.value)
  }

  handleSurname = (event) => {
    const { onSurnameChange } = this.props
    onSurnameChange && onSurnameChange(event.target.value)
  }

  handleDogsname= (event) => {
    const { onDogsnameChange } = this.props
    onDogsnameChange && onDogsnameChange(event.target.value)
  }

  handleAge= (event) => {
    const { onAgeChange } = this.props
    onAgeChange && onAgeChange(event.target.value)
  }

  handleGender= (event) => {
    const { onGenderChange } = this.props
    onGenderChange && onGenderChange(event.target.value)
  }

  handleBreed= (event) => {
    const { onBreedChange } = this.props
    onBreedChange && onBreedChange(event.target.value)
  }

  handleDescriptionChange= (event) => {
    const { onDescriptionChange } = this.props
    onDescriptionChange && onDescriptionChange(event.target.value)
  }

  render() {
    return (
      <div className="PetOwnerPage">
        <form>
          Owner's name and surname
          <div className="inputWraper">

            <div className="inputSmallWraper">
              <input
                className="inputSmall"
                type="text"
                placeholder=" Name"
                name="name"
                onChange={this.handleName}
              />

              <input
                className="inputSmall"
                type="text"
                placeholder=" Surname"
                name="surname"
                onChange={this.handleSurname}
              />

              Info about dog
              <input
                className="inputSmall"
                type="text"
                placeholder=" Dog's name"
                name="dogsname"
                onChange={this.handleDogsName}
              />

              <input
                className="inputSmall"
                type="number" min="1" max="25"
                placeholder=" Age" 
                name="age"
                onChange={this.handleAge}
              />

              <input
                className="inputSmall"
                type="text"
                placeholder=" Gender"
                name="gender"
                onChange={this.handleGender}
              />

              <input
                className="inputSmall"
                type="text"
                placeholder=" Breed"
                name="breed"
                onChange={this.handleBreed}
              />

            </div>
            <input type="file" alt="Your dog's picture" className="photoInput" />
          </div>
          <p>Short description of your dog:</p>
          <textarea rows="4" onChange={this.handleDescriptionChange}></textarea>

          
        </form>
      </div>
    )
  }
}

export default PetOwner
