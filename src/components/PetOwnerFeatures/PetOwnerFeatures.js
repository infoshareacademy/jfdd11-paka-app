import React, { Component } from 'react'

import './PetOwnerFeatures.css'

class PetOwnerFeatures extends Component {
  state ={
    dogWalking : false,
    dayCare : false,
    dayNightCare : false,
    dropIn : false
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
      <div className="PetOwnerFeatures">PetOwnerFeatures
        <form>
          
            <ul className="checkboxSmallWraper">
              <li>
                <input 
                  className="inputCheckbox" 
                  type="checkbox" 
                  value= {this.state.dogWalking} 
                  onChange={this.handleChange} 
                  name="dogWalking"
                  />Dog walking schedule: fit your schedule walks to</li>
              <li>
                <input 
                  className="inputCheckbox" 
                  type="checkbox" 
                  value= {this.state.dogWalking} 
                  onChange={this.handleChange} 
                  name="dayCare"
                />Doggy day-care: daytime care in your sitter's dog friendly home.</li>
              <li>
                <input 
                  className="inputCheckbox" 
                  type="checkbox" 
                  value= {this.state.dogWalking} 
                  onChange={this.handleChange} 
                  name="dayNightCare"
                />Daily or overnight house sitting: perfect for your long working hours.</li>
              <li>
                <input 
                  className="inputCheckbox" 
                  type="checkbox" 
                  value= {this.state.dogWalking} 
                  onChange={this.handleChange} 
                  name="dropIn"
                />Drop-in visit's: for whenever u need a check-in or a play date</li>
            </ul>
        </form>
      </div>
    )
  }
}

export default PetOwnerFeatures
