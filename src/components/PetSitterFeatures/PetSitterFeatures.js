import React, { Component } from 'react'

import './PetSitterFeatures.css'

class PetSitterFeatures extends Component {

  state = {
    schedule: false,
    daycare: false,
    housesitting: false,
    visits: false

  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    onSubmit && onSubmit()
  }

  handleScheduleChange = (event) => {
  
      const { onScheduleChange } = this.props
      onScheduleChange && onScheduleChange(event.target.checked)

  }

  handleDaycareChange = (event) => {
  
    const { onScheduleChange } = this.props
    onScheduleChange && onScheduleChange(event.target.checked)

}

handleHousesittingChange = (event) => {
  
  const { onScheduleChange } = this.props
  onScheduleChange && onScheduleChange(event.target.checked)

}

handleVisitsChange = (event) => {
  
  const { onScheduleChange } = this.props
  onScheduleChange && onScheduleChange(event.target.checked)

}

  render() {
    return (
      <div className="wrapper">
        <div className="smallwrapper">
        <h3>What do you want to do?</h3>
          <input className="inputCheckbox" type="checkbox" onChange={this.handleScheduleChange}/><p>Dog walking schedule: fit your schedule walks to</p>
          <input className="inputCheckbox" type="checkbox" onChange={this.handleDaycareChange}/><p>Doggy day-care: daytime care in your sitter's dog friendly home.</p>
          <input className="inputCheckbox" type="checkbox" onChange={this.handleHousesittingChange}/><p>Daily or overnight house sitting: perfect for your long working hours.</p>
          <input className="inputCheckbox" type="checkbox" onChange={this.handleVisitsChange}/><p>Drop-in visit's: for whenever u need a check-in or a play date</p>
         



        </div>
      
        <button onClick={this.handleSubmit}>Submit</button>
      </div>

    )
  }
}

export default PetSitterFeatures
