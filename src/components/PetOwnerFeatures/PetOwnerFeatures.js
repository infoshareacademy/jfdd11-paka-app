import React, { Component } from 'react'

import './PetOwnerFeatures.css'

class PetOwnerFeatures extends Component {
  state ={
    dogWalking : false,
    dayCare : false,
    dayNightCare : false,
    dropIn : false
  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    onSubmit && onSubmit()
  }

  handleDogWalking = (event) => {
  
      const { onDogWalking } = this.props
      onDogWalking && onDogWalking(event.target.checked)

  }

  handleDayCare = (event) => {
  
    const { onDayCare } = this.props
    onDayCare && onDayCare(event.target.checked)

}

handleDayNightCare = (event) => {
  
  const { onDayNightCare } = this.props
  onDayNightCare && onDayNightCare(event.target.checked)

}

handleDropIn = (event) => {
  
  const { onDropIn } = this.props
  onDropIn && onDropIn(event.target.checked)

}

  render() {
    return (
      <div className="PetOwnerFeatures">PetOwnerFeatures
        <form>
          
            <ul className="checkboxSmallWraper">
              <li>
                <input 
                  className="inputCheckbox" 
                  type="checkbox" 
                  onChange={this.handleDogWalking} 
                  name="dogWalking"
                  />Dog walking schedule: fit your schedule walks to</li>
              <li>
                <input 
                  className="inputCheckbox" 
                  type="checkbox" 
                  onChange={this.handleDayCare} 
                  name="dayCare"
                />Doggy day-care: daytime care in your sitter's dog friendly home.</li>
              <li>
                <input 
                  className="inputCheckbox" 
                  type="checkbox" 
                  onChange={this.handleDayNightCare} 
                  name="dayNightCare"
                />Daily or overnight house sitting: perfect for your long working hours.</li>
              <li>
                <input 
                  className="inputCheckbox" 
                  type="checkbox" 
                  onChange={this.handleDropIn} 
                  name="dropIn"
                />Drop-in visit's: for whenever u need a check-in or a play date</li>
            </ul>
            <button className="submit" onClick={this.handleSubmit}>Submit</button>
            
        </form>
      </div>
    )
  }
}

export default PetOwnerFeatures
