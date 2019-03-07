import React, { Component } from "react";

import { Button, Fade, Alert } from "reactstrap";

import "./PetSitterWizard.css";

import PetSitterFeatures from "../PetSitterFeatures";

import PetSitter from "../PetSitter";

import firebase from "firebase";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";

class PetSitterWizard extends Component {
  state = {
    name: "",
    surname: "",
    age: "",
    adress: "",
    description: "",
    schedule: false,
    daycare: false,
    housesitting: false,
    visits: false,
    positionx: "",
    positiony: "",
    error: null
  };

  constructor(props) {
    super(props);
    this.state = { fadeIn: false };
    this.toggle = this.toggle.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      name,
      surname,
      age,
      adress,
      description,
      schedule,
      daycare,
      housesitting,
      visits,
      file,
      positionx,
      positiony
    } = this.state;
    const userId = firebase.auth().currentUser.uid;

    if (event.target.value === 0) {
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
          schedule,
          daycare,
          housesitting,
          visits,
          positionx: parseFloat(positionx) || 0,
          positiony: parseFloat(positiony) || 0
        })
        .catch(error => this.setState({ error: error }));
    } else {
      this.setState({ error: new Error("Please fill all the inputs!") });
    }

    // More info about uploading files:
    // https://firebase.google.com/docs/storage/web/upload-files
    if (file !== undefined) {
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
        .catch(error => this.setState({ error: error }));
    } else {
      this.setState({
        error: new Error("Please upload Your photo!")
      });
    }
  };

  handleChange = event => {
    console.log(event)
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggle() {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <div className="SignUp">
            {this.state.error && (
              <Alert color="danger" style={{ color: "red" }}>
                {this.state.error.message}
              </Alert>
            )}
          </div>
          <PetSitter
            onChange={this.handleChange}
            onFileSelected={this.handleFileSelected}
          />
          <PetSitterFeatures
            onChange={this.handleChange}
          />
          <Button
            color="warning"
            type="submit"
            link={"/myprofile/:userId"}
            onClick={this.toggle}
          >
            Submit
          </Button>
          <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
            Thanks, mate!
          </Fade>
        </Form>
      </>
    );
  }
}

export default PetSitterWizard;
