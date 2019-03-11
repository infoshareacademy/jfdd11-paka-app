import React, { Component } from 'react'
import firebase from "firebase";
import {
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import './PetsList.css'

class PetsList extends Component {
state = {
  pets: [],
  dogsname: "",
  age: "",
  breed: "",
  gender: "",
  description: '',
  file: null
};

componentDidMount() {
  firebase.auth().onAuthStateChanged(currentpet => {
    if (currentpet !== null) {

      firebase
        .database()
        .ref(`pets`)
        .once("value")
        .then(snapshot => snapshot.val())
        .then(pets => {
          this.setState({ pets: Object.entries(pets || {}).map(([id, value]) => ({ id, ...value })) });
        });
    }
  });
}

  render() { 

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="PetsList">
      <div>
        
            <div >
              {this.state.pets
                .map(pet => (
                  <Card key={pet.id}>
                    <CardBody>
                      <CardTitle>{pet.dogsname}</CardTitle>
                      <CardTitle>Age: {pet.age}</CardTitle>
                      <CardTitle>Breed: {pet.breed}</CardTitle>
                      <CardTitle>Gender: {pet.gender}</CardTitle>
                      <CardTitle>Description: {pet.description}</CardTitle>
                    </CardBody>
                    <div style={{ textAlign: "center" }}>
                      <img src={pet.photo} alt="Soon i will add my dog's photo:)" style={{width: '100%'}} />
                    </div>
                   
                  </Card>
                ))}
            </div>
      </div>
    </div>
  );

  }
}

export default PetsList


