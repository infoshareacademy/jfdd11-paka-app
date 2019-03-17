import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import { Button, Alert } from "reactstrap";

import "./PetSitterWizard.css";

import PetSitterFeatures from "../PetSitterFeatures";

import PetSitter from "../PetSitter";

import firebase from "firebase";

import { Form } from "reactstrap";

class PetSitterWizard extends Component {
  state = {
    name: "",
    surname: "",
    age: "",
    adress: "",
    description: "",
    phone: "",
    schedule: false,
    daycare: false,
    housesitting: false,
    visits: false,
    positionx: "",
    positiony: "",
    error: null,
    success: null,
    file: null
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      name,
      surname,
      age,
      adress,
      phone,
      description,
      schedule,
      daycare,
      housesitting,
      visits,
      file,
      positionx,
      positiony,
      tmpFile
    } = this.state;

    const isValid =
      [name, surname, age, adress, phone].filter(field => field.length === 0)
        .length === 0;

    const userId = firebase.auth().currentUser.uid;

    if (isValid) {
      firebase
        .database()
        .ref("users")
        .child(userId)
        .update({
          name,
          surname,
          age,
          adress,
          description,
          phone: isNaN(parseFloat(phone)) ? 0 : parseFloat(phone),
          schedule,
          daycare,
          housesitting,
          visits,
          positionx: isNaN(parseFloat(positionx)) ? 0 : parseFloat(positionx),
          positiony: isNaN(parseFloat(positiony)) ? 0 : parseFloat(positiony)
        })
        .then(data => {
          this.setState({ success: "Thank You" });
        })
        .catch(error => this.setState({ error }));
    } else {
      this.setState({ error: new Error("Please fill all the inputs!") });
    }

    // More info about uploading files:
    // https://firebase.google.com/docs/storage/web/upload-files
    console.log(tmpFile);
    if (tmpFile) {
      const storageRef = firebase.storage().ref();
      const ref = storageRef.child(`${userId}.jpg`);
      ref
        .put(file)
        .then(data =>
          data.ref.getDownloadURL().then(url =>
            firebase
              .database()
              .ref("users")
              .child(userId)
              .child("photo")
              .set(url)
          )
        )
        .catch(error => this.setState({ error }));
    } else {
      this.setState({
        error: new Error("Please upload Your photo!")
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handlePosChange = ({ target: { name, checked } }) => {
    this.setState({
      [name]: checked
    });
  };

  updatePosition = position => {
    this.setState({
      positionx: position.lat,
      positiony: position.lng
    });
  };

  handleFile = event => {
    const file = event.target.files[0];
    this.setState({
      file: file,
      tmpFile: URL.createObjectURL(file)
    });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        firebase
          .database()
          .ref("users")
          .child(user.uid)
          .once("value", snapshot => {
            console.log(snapshot.val());
            const {
              name = "",
              surname = "",
              age = "",
              adress = "",
              phone = "",
              photo,
              description = "",
              daycare = false,
              schedule = false,
              housesitting = false,
              visits = false,
              positionx,
              positiony
            } = snapshot.val() || {};
            this.setState({
              redirectTo: snapshot.val() === null ? '/users' : `/users/${user.uid}`,
              name,
              surname,
              age,
              adress,
              file: photo,              
              phone,
              description,
              schedule,
              daycare,
              housesitting,
              visits,
              positionx,
              positiony
            });
          });
      }
    });
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          {this.state.success && <Redirect to={this.state.redirectTo} />}
          <div className="Error">
            {this.state.error && (
              <Alert color="danger" style={{ color: "red" }}>
                {this.state.error.message}
              </Alert>
            )}
          </div>
          <PetSitter
            {...this.state}
            onChange={this.handleChange}
            onFileSelected={this.handleFile}
          />
          <PetSitterFeatures
            {...this.state}
            onPositionChange={this.updatePosition}
            onChange={this.handleChange}
            onPosChange={this.handlePosChange}
          />
          <Button type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default PetSitterWizard;
