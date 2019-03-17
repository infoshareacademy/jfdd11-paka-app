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
                        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.5)",
                        margin: "20px auto",
                        maxWidth: '80vw'
                      }} key={pet.id}>
                <CardBody>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={pet.photo}
                    alt="My dog"
                    style={{ width: "100%" }}
                  />
                </div>
                  <CardTitle>Name: <span>{pet.dogsname}</span></CardTitle>
                  <CardTitle>Age: <span>{pet.age}</span></CardTitle>
                  <CardTitle>Breed: <span>{pet.breed}</span></CardTitle>
                  <CardTitle>Gender: <span>{pet.gender}</span></CardTitle>
                  <CardTitle>Description: <span>{pet.description ? pet.description : "blank"}</span></CardTitle>
                    { this.getOwnerById(pet.ownerId) !== "not registered"?
                      <CardTitle>
                        Owner:<span><NavLink to={`/users/${pet.ownerId}`} className='NavLinkUser' tag={RNavLink} style={{display: 'inline-block'}}>
                          {this.getOwnerById(pet.ownerId)}
                        </NavLink></span> 
                      </CardTitle>
                      : 
                      <CardTitle>Owner:<span>{this.getOwnerById(pet.ownerId)}</span>
                      </CardTitle>
                    }
                  <CardTitle>Adress: <span>{this.getOwnerByAdress(pet.ownerId)}</span></CardTitle>
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
