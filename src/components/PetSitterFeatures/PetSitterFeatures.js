import React, { Component } from "react";

import { CustomInput, Input, Col, Row } from "reactstrap";

import "./PetSitterFeatures.css";
import FormMap from "../FormMap/FormMap";

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
            name="schedule"
            onChange={onPosChange}
            checked={schedule}
          />
          <p>Dog walking</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch2"
            name="daycare"
            onChange={onPosChange}
            checked={daycare}
          />
          <p>Doggy day-care: daytime care in your dog-friendly home.</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch3"
            name="housesitting"
            onChange={onPosChange}
            checked={housesitting}
          />
          <p>Daily or overnight house-sitting at the dog owner's place.</p>
          <CustomInput
            type="switch"
            id="exampleCustomSwitch4"
            name="visits"
            onChange={onPosChange}
            checked={visits}
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
            onChange={onChange}
            value={positionx}
          />
          <Input
            id="positionY"
            name="positiony"
            placeholder="position Y"
            onChange={onChange}
            value={positiony}
          />
          </Col>
          </Row>
          <div>
            <FormMap lat={positionx} lng={positiony} onClick={this.props.onPositionChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default PetSitterFeatures;
