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

  handleChange = event => {
    const { onChange } = this.props;
    onChange && onChange(event.target.value);
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
                onChange={this.handleChange}
                value={this.state.name}
              />
            </FormGroup>

            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="Surname"
                name="Surname"
                onChange={this.handleChange}
                value={this.state.surname}
              />
            </FormGroup>

            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="Age"
                name="age"
                onChange={this.handleChange}
                value={this.state.age}
              />
            </FormGroup>

            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="Adress"
                name="adress"
                onChange={this.handleChange}
                value={this.state.adress}
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
            />
          </Card>
        </div>
        <p>Short description of you:</p>
        <FormGroup>
          <Input
            type="textarea"
            rows="4"
            onChange={this.handleChange}
            value={this.state.description}
          />
        </FormGroup>
      </div>
    );
  }
}

export default PetSitter;
