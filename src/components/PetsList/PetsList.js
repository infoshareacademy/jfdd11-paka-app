import React, { Component } from "react";
import firebase from "firebase";
import { Card, CardBody, CardTitle } from "reactstrap";

import "./PetsList.css";

import { NavLink } from "reactstrap";
import { NavLink as RNavLink} from "react-router-dom";
class PetsList extends Component {
  state = {
    pets: [],
    users: [],
    owner: "",
    dogsname: "",
    age: "",
    breed: "",
    gender: "",
    description: "",
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
            this.setState({
              pets: Object.entries(pets || {}).map(([id, value]) => ({
                id,
                ...value
              }))
            });
          });

        firebase
          .database()
          .ref(`users`)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(users => {
            this.setState({
              users: Object.entries(users || {}).map(([id, value]) => ({
                id,
                ...value
              }))
            });
          });
      }
    });
  }

  getOwnerById = (ownerId) => {
   
    const user = this.state.users.find(user=>user.id ===ownerId)
    return (user && user.name ? user.name : "not registered")
  }

  getOwnerByAdress = (ownerId) => {
   
    const user = this.state.users.find(user=>user.id ===ownerId)
    return (user && user.adress ? user.adress : "not filled")
  }

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="PetsList"
      >
        <div>
          <div>
            {this.state.pets.map(pet => (
              <Card style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 20,
                        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.5)",
                        margin: "20px 0"
                      }} key={pet.id}>
                <CardBody>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={pet.photo}
                    alt="My dog"
                    style={{ width: "100%" }}
                  />
                </div>
                  <CardTitle>Name: {pet.dogsname}</CardTitle>
                  <CardTitle>Age: {pet.age}</CardTitle>
                  <CardTitle>Breed: {pet.breed}</CardTitle>
                  <CardTitle>Gender: {pet.gender}</CardTitle>
                  <CardTitle>Description: {pet.description ? pet.description : "unfilled"}</CardTitle>
                    { this.getOwnerById(pet.ownerId) !== "not registered"?
                      <CardTitle>
                        Owner:
                        <NavLink to={`/users/${pet.ownerId}`} tag={RNavLink} style={{display:'inline-block', color: "blue"}}>
                          {this.getOwnerById(pet.ownerId)}
                        </NavLink>
                      </CardTitle>
                      : 
                      <CardTitle>
                          Owner: {this.getOwnerById(pet.ownerId)}
                      </CardTitle>
                    }
                  <CardTitle>Adress: {this.getOwnerByAdress(pet.ownerId)}</CardTitle>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PetsList;
