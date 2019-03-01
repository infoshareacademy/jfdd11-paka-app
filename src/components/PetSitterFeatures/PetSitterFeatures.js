import React, { Component } from 'react'

import { CustomInput } from 'reactstrap';

import './PetSitterFeatures.css'

class PetSitterFeatures extends Component {

  state = {
    schedule: false,
    daycare: false,
    housesitting: false,
    visits: false

  }

  handleScheduleChange = (event) => {

    const { onScheduleChange } = this.props
    onScheduleChange && onScheduleChange(event.target.checked)

  }

  handleDaycareChange = (event) => {

    const { onDaycareChange } = this.props
    onDaycareChange && onDaycareChange(event.target.checked)

  }

  handleHousesittingChange = (event) => {

    const { onHousesittingChange } = this.props
    onHousesittingChange && onHousesittingChange(event.target.checked)

  }

  handleVisitsChange = (event) => {

    const { onVisitsChange } = this.props
    onVisitsChange && onVisitsChange(event.target.checked)

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
      <div className="wrapper">
        <div className="smallwrapper">
          <h3>What do you offer?</h3>
          <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" onChange={this.handleScheduleChange} /><p>Dog walking</p>
          <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" onChange={this.handleDaycareChange} /><p>Doggy day-care</p>
          <CustomInput type="switch" id="exampleCustomSwitch3" name="customSwitch" onChange={this.handleHousesittingChange} /><p>Daily or overnight house sitting</p>
          <CustomInput type="switch" id="exampleCustomSwitch4" name="customSwitch" onChange={this.handleVisitsChange} /><p>Drop-in visits</p>

          <p>What's your coordinates, mate?</p>
          <input id="positionX" type="text"  placeholder="position X" onChange={this.handlePositionXChange} ></input>
          <input id="positionY" type="text"  placeholder="position Y" onChange={this.handlePositionYChange} ></input>
          

        </div>


      </div>

    )
  }
}

export default PetSitterFeatures
