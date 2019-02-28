import React, { Component } from 'react'


import './PetSitter.css'



class PetSitter extends Component {

  state= {
   name: '',
   surname: '',
   age: '',
   adress: '',
   description: ''

  }

  
  handleNameChange= (event) => {
    const { onNameChange } = this.props
    onNameChange && onNameChange(event.target.value)
  }

  handleSurnameChange = (event) => {
    const { onSurnameChange } = this.props 
    onSurnameChange && onSurnameChange(event.target.value)
  }

  handleAgeChange= (event) => {
    const { onAgeChange } = this.props
    onAgeChange && onAgeChange(event.target.value)
  }

  handleAdressChange= (event) => {
    const { onAdressChange } = this.props
    onAdressChange && onAdressChange(event.target.value)
  }

  handleDescriptionChange= (event) => {
    const { onDescriptionChange } = this.props
    onDescriptionChange && onDescriptionChange(event.target.value)
  }

  render() {
    return (
      <div className="PetSitter"><p>PetSitter</p>
        <form>
          <div className="inputWraper">
            <div className="inputSmallWraper">
              <input 
              className="inputSmall" 
              type="text" 
              placeholder="Name" 
              name="name" 
              onChange={this.handleNameChange}
              />

              <input 
              className="inputSmall" 
              type="text" 
              placeholder="Surname"
              name="Surname" 
              onChange={this.handleSurnameChange}
              />

              <input 
              className="inputSmall" 
              type="text" 
              placeholder="Age"
              name="age" 
              onChange={this.handleAgeChange}
              />

              <input 
              className="inputSmall" 
              type="text" 
              placeholder="Adress"
              name="adress"   
              onChange={this.handleAdressChange}
              />
                                          
            </div>
            <input type="image" alt="Your Pic" className="photoInput"/>
          </div>
          <p>Short description of you:</p>
          <textarea rows= "4" onChange={this.handleDescriptionChange} ></textarea>
          
        </form>
        </div>
    )
  }
}

export default PetSitter
