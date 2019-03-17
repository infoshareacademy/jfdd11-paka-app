import React, { Component } from "react";
import { Input, Card, CardImg, FormGroup } from "reactstrap";
import "./PetOwner.css";

const initialState = {
  name: "",
  surname: "",
  dogsname: "",
  age: "",
  gender: "",
  breed: "",
  description: "",
  file: null
};

class PetOwner extends Component {
  state = initialState;

  handleDogsname = event => {
    const { onDogsnameChange } = this.props;
    onDogsnameChange && onDogsnameChange(event.target.value);
  };

  handleAge = event => {
    const { onAgeChange } = this.props;
    onAgeChange && onAgeChange(event.target.value);
  };

  handleGender = event => {
    const { onGenderChange } = this.props;
    onGenderChange && onGenderChange(event.target.value);
  };

  handleBreed = event => {
    const { onBreedChange } = this.props;
    onBreedChange && onBreedChange(event.target.value);
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
      <div className="PetOwnerPage">   
        <div className="inputWraper">
          <div className="inputSmallWraper">
            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="* Dog's name"
                name="dogsname"
                onChange={this.handleDogsname}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="inputSmall"
                type="number"
                min="1"
                max="25"
                placeholder="* Age"
                name="age"
                onChange={this.handleAge}
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="* Gender"
                name="gender"
                onChange={this.handleGender}
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                className="inputSmall"
                type="text"
                placeholder="* Breed"
                name="breed"
                onChange={this.handleBreed}
                required
              />
              <h6>* - required</h6>
            </FormGroup>
            
          </div>
          <div style={{marginLeft: '10px' }}>
            <Card style={{borderRadius: '5px'}}>
              
              <CardImg src={file} alt="" />
              <Input className="inputFile"
                type="file"
                name="file" 
                id="exampleFile"
                onChange={this.handleFileSelected}
                required
              />
            </Card>
          </div>
        </div>
        <h6>Short description of your dog:</h6>
        <FormGroup>
          <Input
            type="textarea"
            rows="4"
            name="description"
            onChange={this.handleDescriptionChange}
            
          />
        </FormGroup>
       
      </div>
    );
  }
}

export default PetOwner;
