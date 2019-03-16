import React, { Component } from "react";

import "./PetSitter.css";

import { Input, FormGroup, CardImg, Card } from "reactstrap";

class PetSitter extends Component {
  render() {
    const {
      file,
      tmpFile,
      name,
      surname,
      age,
      adress,
      phone,
      description,
      onChange,
      onFileSelected
    } = this.props;
    return (
      <div className="PetSitter">
        <div className="inputWraper">
          <div className="inputSmallWraper">
            <FormGroup>
              <Input
                id="name"
                placeholder="Name"
                name="name"
                onChange={onChange}
                value={name}
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                placeholder="Surname"
                name="surname"
                onChange={onChange}
                value={surname}
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                placeholder="Age"
                name="age"
                onChange={onChange}
                value={age}
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                placeholder="Phone Number"
                name="phone"
                onChange={onChange}
                value={phone}
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                placeholder="Address"
                name="adress"
                onChange={onChange}
                value={adress}
              />
            </FormGroup>
          </div>
          <Card>
            <CardImg src={tmpFile || file} alt="" />
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={onFileSelected}
            />
          </Card>
        </div>
        <p>Short description of you:</p>
        <FormGroup>
          <Input
            type="textarea"
            rows="4"
            name="description"
            onChange={onChange}
            value={description}
          />
        </FormGroup>
      </div>
    );
  }
}

export default PetSitter;
