import React, { Component } from "react";

import { CustomInput, Input, Col, Row } from "reactstrap";

import "./PetSitterFeatures.css";

class PetSitterFeatures extends Component {
  render() {
    const {
      schedule,
      daycare,
      housesitting,
      visits,
      positionx,
      positiony,
      onChange,
      onPosChange
    } = this.props;
    return (
      <div className="wrapper">
        <div className="smallwrapper">
          <h3>What do you offer?</h3>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch"
            name="customSwitch"
            onChange={onChange}
            value={schedule}
          />
          <p>Dog walking</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch2"
            name="customSwitch"
            onChange={onChange}
            value={daycare}
          />
          <p>Doggy day-care: daytime care in your dog-friendly home.</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch3"
            name="customSwitch"
            onChange={onChange}
            value={housesitting}
          />
          <p>Daily or overnight house-sitting at the dog owner's place.</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch4"
            name="customSwitch"
            onChange={onChange}
            value={visits}
          />
          <p>
            Drop-in visits: for whenever the doggo needs a sitter to check in at
            their place
          </p>

          <p>What's your coordinates, mate?</p>
          <Row form>
          <Col md={2}>
          <Input
            id="positionX"
            name="positionx"
            placeholder="position X"
            onPosChange={onPosChange}
            value={positionx}
          />
          <Input
            id="positionY"
            name="positiony"
            placeholder="position Y"
            onPosChange={onPosChange}
            value={positiony}
          />
          </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default PetSitterFeatures;
