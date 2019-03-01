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


  render() {
    return (
      <div className="wrapper">
        <div className="smallwrapper">
          <h3>What do you want to do?</h3>
          <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" onChange={this.handleScheduleChange} /><p>Dog walking schedule: fit your schedule walks to</p>
          <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" onChange={this.handleDaycareChange} /><p>Doggy day-care: daytime care in your sitter's dog friendly home.</p>
          <CustomInput type="switch" id="exampleCustomSwitch3" name="customSwitch" onChange={this.handleHousesittingChange} /><p>Daily or overnight house sitting: perfect for your long working hours.</p>
          <CustomInput type="switch" id="exampleCustomSwitch4" name="customSwitch" onChange={this.handleVisitsChange} /><p>Drop-in visit's: for whenever u need a check-in or a play date</p>




        </div>


      </div>

    )
  }
}

export default PetSitterFeatures
