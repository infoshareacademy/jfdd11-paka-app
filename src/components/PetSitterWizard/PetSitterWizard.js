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
      positiony
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
        .set({
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
        }).then(data => { this.setState({success: "Thank You"})})
        .catch(error => this.setState({ error: error }));
    } else {
      this.setState({ error: new Error("Please fill all the inputs!") });
    }

    // More info about uploading files:
    // https://firebase.google.com/docs/storage/web/upload-files
    console.log(file);
    if (file !== null) {
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
        .catch(error => this.setState({ error: error }))
    } else {
      this.setState({
        error: new Error("Please upload Your photo!")
      });
    }
  };

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value
    });
  };

  handleFile = file => {
    this.setState({
      file: file
    });
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
        {this.state.success && <Redirect to="/users" />}
          <div className="Error">
            {this.state.error && (
              <Alert color="danger" style={{ color: "red" }}>
                {this.state.error.message}
              </Alert>
            )}
          </div>
          <PetSitter
            onChange={this.handleChange}
            onFileSelected={this.handleFile}
          />
          <PetSitterFeatures onChange={this.handleChange} />
          <Button color="warning" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default PetSitterWizard;
