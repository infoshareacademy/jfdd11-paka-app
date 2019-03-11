import React, { Component } from "react";

import "./PetOwnerWizard.css";
import PetOwner from "../PetOwner";
import PetOwnerFeatures from "../PetOwnerFeatures";

import firebase from "firebase";

class PetOwnerWizard extends Component {
  state = {
    dogsname: "",
    age: null,
    gender: "",
    breed: "",
    description: "",
    dogWalking: false,
    dayCare: false,
    dayNightCare: false,
    dropIn: false,
    positionx: "",
    positiony: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      dogsname,
      age,
      gender,
      breed,
      description,
      dogWalking,
      dayCare,
      dayNightCare,
      dropIn,
      positionx,
      positiony,
      file
    } = this.state;

    console.log("handlesubmit", this.state);
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
        description,
        dogWalking,
        dayCare,
        dayNightCare,
        dropIn,
        positionx: parseFloat(positionx) || 0,
        positiony: parseFloat(positiony) || 0
      });

    const storageRef = firebase.storage().ref();
    const ref = storageRef.child(`${userId}.jpg`);
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
  };

  handleNameChange = name => {
    this.setState({ name });
  };

  handleSurnameChange = surname => {
    this.setState({ surname });
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
    this.setState({ description });
  };

  handleDogWalking = dogWalking => {
    this.setState({ dogWalking });
  };

  handleDayCare = dayCare => {
    this.setState({ dayCare });
  };

  handleDayNightCare = dayNightCare => {
    this.setState({ dayNightCare });
  };

  handleDropIn = dropIn => {
    this.setState({ dropIn });
  };

  handlePositionXChange = positionx => {
    this.setState({ positionx });
  };

  handlePositionYChange = positiony => {
    this.setState({ positiony });
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
            onSurnameChange={this.handleSurnameChange}
            onNameChange={this.handleNameChange}
            onFileSelected={this.handleFileSelected}
          />
          <PetOwnerFeatures
            onDogWalking={this.handleDogWalking}
            onDayCare={this.handleDayCare}
            onDayNightCare={this.handleDayNightCare}
            onDropIn={this.handleDropIn}
            onPositionXChange={this.handlePositionXChange}
            onPositionYChange={this.handlePositionYChange}
          />
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PetOwnerWizard;
