import React, { Component } from 'react'
import firebase from "firebase";
import { Card, CardBody, CardTitle } from "reactstrap";


import './MyPets.css'

class MyPets extends Component {
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
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        const userId = currentUser.uid
        
        firebase
          .database()
          .ref(`pets`)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(pets => {
            this.setState({
              pets: Object.entries(pets || {}).filter(([,{ ownerId}]) => ownerId === userId).map(([id, value]) => ({
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


  render() {
    
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="mypets"
      >
        <div>
          <div>
            {this.state.pets.map(pet => (
              <Card key={pet.id}>
                <CardBody>
                  <CardTitle>Dog's name: {pet.dogsname}</CardTitle>
                  <CardTitle>Age: {pet.age}</CardTitle>
                  <CardTitle>Breed: {pet.breed}</CardTitle>
                  <CardTitle>Gender: {pet.gender}</CardTitle>
                  <CardTitle>Description: {pet.description ? pet.description : "unfilled"}</CardTitle>
                  <CardTitle>
                    Owner: {this.getOwnerById(pet.ownerId)}
                  </CardTitle>
                </CardBody>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={pet.photo}
                    alt="Soon i will add my dog's photo:)"
                    style={{ width: "100%" }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MyPets
