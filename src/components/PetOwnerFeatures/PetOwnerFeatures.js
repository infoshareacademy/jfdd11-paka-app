import React, { Component } from 'react'
import { CustomInput } from 'reactstrap';
import './PetOwnerFeatures.css'

class PetOwnerFeatures extends Component {
  state = {
    dogWalking: false,
    dayCare: false,
    dayNightCare: false,
    dropIn: false
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

  handlePositionXChange = (event) => {

    const { onPositionXChange } = this.props
    onPositionXChange && onPositionXChange(event.target.value)

  }

  handlePositionYChange = (event) => {

    const { onPositionYChange } = this.props
    onPositionYChange && onPositionYChange(event.target.value)

  }

  render() {
    return (
      <div className="PetOwnerFeatures">PetOwnerFeatures


            <ul className="checkboxSmallWraper">
          <li>
          <CustomInput
              className="inputCheckbox"
              id="exampleCustomSwitch1"
              type="switch"
              onChange={this.handleDogWalking}
              name="dogWalking"
            />Dog walking schedule: fit your schedule walks to</li>
          <li>
          <CustomInput
              className="inputCheckbox"
              id="exampleCustomSwitch2"
              type="switch"
              onChange={this.handleDayCare}
              name="dayCare"
            />Doggy day-care: daytime care in your sitter's dog friendly home.</li>
          <li>
          <CustomInput
              className="inputCheckbox"
              id="exampleCustomSwitch3"
              type="switch"
              onChange={this.handleDayNightCare}
              name="dayNightCare"
            />Daily or overnight house sitting: perfect for your long working hours.</li>
          <li>
          <CustomInput
              className="inputCheckbox"
              id="exampleCustomSwitch4"
              type="switch"
              onChange={this.handleDropIn}
              name="dropIn"
            />Drop-in visit's: for whenever u need a check-in or a play date</li>
        </ul>
        <p>What's your coordinates, mate?</p>
          <input id="positionX" type="text"  placeholder="position X" onChange={this.handlePositionXChange} ></input>
          <input id="positionY" type="text"  placeholder="position Y" onChange={this.handlePositionYChange} ></input>


      </div>
    )
  }
}

export default PetOwnerFeatures
