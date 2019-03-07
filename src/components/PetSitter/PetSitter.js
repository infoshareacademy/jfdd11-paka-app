import React, { Component } from "react";

import "./PetSitter.css";

import { Input, FormGroup, CardImg, Card } from "reactstrap";

class PetSitter extends Component {
  state = {
    name: "",
    surname: "",
    age: "",
    adress: "",
    description: "",
    file: null
  };

  handleNameChange = event => {
    const { onNameChange } = this.props;
    onNameChange && onNameChange(event.target.value);
  };

  handleSurnameChange = event => {
    const { onSurnameChange } = this.props;
    onSurnameChange && onSurnameChange(event.target.value);
  };

  handleAgeChange = event => {
    const { onAgeChange } = this.props;
    onAgeChange && onAgeChange(event.target.value);
  };

  handleAdressChange = event => {
    const { onAdressChange } = this.props;
    onAdressChange && onAdressChange(event.target.value);
  };

  handleDescriptionChange = event => {
    const { onDescriptionChange } = this.props;
    onDescriptionChange && onDescriptionChange(event.target.value);
  };

  handleFileSelected = event => {
    const { onFileSelected } = this.props;
    onFileSelected && onFileSelected(event.target.files[0]);
    this.setState({ file: URL.createObjectURL(event.target.files[0]) });
  };


  render() {
    const { file } = this.state;
    return (
      <div className="PetSitter">
        <h1>PetSitter</h1>

        <div className="inputWraper">
          <div className="inputSmallWraper">

            <FormGroup>
              <Input
                id="name"
                placeholder="Name"
                onChange={this.handleNameChange}
              />
            </FormGroup>

            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="Surname"
                name="Surname"
                onChange={this.handleSurnameChange}
              />
            </FormGroup>

            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="Age"
                name="age"
                onChange={this.handleAgeChange}
              />
            </FormGroup>

            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="Adress"
                name="adress"
                onChange={this.handleAdressChange}
              />
            </FormGroup>
          </div>
            <Card>
            <CardImg src={file} alt="" />
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={this.handleFileSelected}
            /></Card>
          
        </div>
        <p>Short description of you:</p>
        <FormGroup>
        <Input type="textarea" rows="4"  onChange={this.handleDescriptionChange} />
        </FormGroup>
      </div>
    );
  }
}

export default PetSitter;
