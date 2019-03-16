import React, { Component } from "react";

import "./PetOwnerWizard.css";
import PetOwner from "../PetOwner";
import { Button } from "reactstrap";
import firebase from "firebase";

class PetOwnerWizard extends Component {
  state = {
    dogsname: "",
    age: null,
    gender: "",
    breed: "",
    description: "",
    
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      dogsname,
      age,
      gender,
      breed,
      description,
     
      file
    } = this.state;

    const userId = firebase.auth().currentUser.uid;
    const petId = firebase
      .database()
      .ref("pets")
      .push().key;

    firebase
      .database()
      .ref("pets")
      .child(petId)
      .set({
        ownerId: userId,
        dogsname,
        age,
        gender,
        breed,
        description
       
      });

    const storageRef = firebase.storage().ref();
    const ref = storageRef.child(`${petId}.jpg`);
    ref.put(file).then(data =>
      data.ref.getDownloadURL().then(url =>
        firebase
          .database()
          .ref("pets")
          .child(petId)
          .child("photo")
          .set(url)
      )
    );
    this.props.history.push(`/users/${userId}`)
  };

  handleDogsname = dogsname => {
    this.setState({ dogsname });
  };

  handleAge = age => {
    this.setState({ age });
  };

  handleFileSelected = file => {
    this.setState({ file });
  };

  handleGender = gender => {
    this.setState({ gender });
  };

  handleBreed = breed => {
    this.setState({ breed });
  };

  handleDescriptionChange = description => {
    this.setState({description});
  };

  render() {
    return (
      <div className="PetOwnerWizard">
        <form onSubmit={this.handleSubmit}>
          <PetOwner
            onDescriptionChange={this.handleDescriptionChange}
            onBreedChange={this.handleBreed}
            onGenderChange={this.handleGender}
            onAgeChange={this.handleAge}
            onDogsnameChange={this.handleDogsname}
            onFileSelected={this.handleFileSelected}
          />
          
          <Button type="submit" style={{marginLeft: '1%' }}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default PetOwnerWizard;
