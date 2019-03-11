import React, { Component } from "react";

import { CustomInput } from "reactstrap";

import "./PetSitterFeatures.css";

class PetSitterFeatures extends Component {
  state = {
    schedule: false,
    daycare: false,
    housesitting: false,
    visits: false
  };

  handleChange = event => {
    const { onChange } = this.props;
    onChange && onChange(event.target.checked);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="smallwrapper">
          <h3>What do you offer?</h3>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch"
            name="customSwitch"
            onChange={this.handleChange}
          />
          <p>Dog walking</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch2"
            name="customSwitch"
            onChange={this.handleChange}
          />
          <p>Doggy day-care: daytime care in your dog-friendly home.</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch3"
            name="customSwitch"
            onChange={this.handleChange}
          />
          <p>Daily or overnight house-sitting at the dog owner's place.</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch4"
            name="customSwitch"
            onChange={this.handleChange}
          />
          <p>
            Drop-in visits: for whenever the doggo needs a sitter to check in at
            their place
          </p>

          <p>What's your coordinates, mate?</p>
          <input
            id="positionX"
            type="text"
            placeholder="position X"
            onChange={this.handleChange}
          />
          <input
            id="positionY"
            type="text"
            placeholder="position Y"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default PetSitterFeatures;
