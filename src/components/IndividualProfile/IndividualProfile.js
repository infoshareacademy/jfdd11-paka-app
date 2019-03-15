import React, { Component } from "react";
import { Card, CardImg, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHome,
  faCouch,
  faWalking,
  faDog,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import  { Redirect } from 'react-router-dom'

import "./IndividualProfile.css";

class IndividualProfile extends Component {
  state = {
    name: "",
    surname: "",
    age: "",
    address: "",
    description: "",
    dayCareAtPetsitters: "",
    houseSittingAtYourPlace: "",
    availableToDropIn: "",
    availableForWalks: "",
    pets: []
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        const userId = this.props.match.params.userId;
        firebase
          .database()
          .ref(`users/${userId}`)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(user => {
            if (user === null) {
              return;
            }
            this.setState({
              name: user.name,
              surname: user.surname,
              age: user.age,
              photo: user.photo,
              address: user.adress,
              description: user.description,
              dayCareAtPetsitters: user.daycare,
              houseSittingAtYourPlace: user.housesitting,
              availableToDropIn: user.visits,
              availableForWalks: user.visits
            });
          });

          firebase
          .database()
          .ref(`pets`)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(pets => {
            if (pets === null) {
              return;
            }
            this.setState({
             pets: Object.entries(pets || {}).filter(([,{ ownerId}]) => ownerId === userId).map(([id, value]) => ({ id, ...value }))
            });
          });

      }
    });
  }

  render() {
    const userId = this.props.match.params.userId;
    const { pets } = this.state
    console.log(this.state.pets, userId)
    return (
      <div className="IndividualProfile">
        <br />
        <h1 style={{ textAlign: "center" }}>
          {this.state.name}
          {"  "}
          {this.state.surname}
        </h1>
        <br />
        <div>
          <Card>
            <CardImg
              top
              width="100%"
              src={this.state.photo + "&size=150x150"}
              alt="My profile"
            />
          </Card>
          <div
            className="IndividualProfileText"
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
              width: "80vw",
              margin: "0 auto"
            }}
          >
            <div>
              <p>Age: </p> <span>{this.state.age}</span>
            </div>
            <div>
              <p>Address:</p> <span>{this.state.address}</span>
            </div>
            <h5
              style={{
                fontWeight: "bold",
                paddingTop: "20",
                paddingBottom: "10"
              }}
            >
              {" "}
              Available for:{" "}
            </h5>
            <div className="cardTextRow">
              <p>
                <FontAwesomeIcon icon={faCouch} /> Day-care at pet-sitter's
                place:{" "}
              </p>{" "}
              <span>
                {" "}
                {this.state.dayCareAtPetsitters ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </span>
            </div>
            <div>
              <p>
                {" "}
                <FontAwesomeIcon icon={faHome} /> House-sitting at dog-owner
                place:
              </p>{" "}
              <span>
                {this.state.houseSittingAtYourPlace ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </span>
            </div>
            <div>
              <p>
                {" "}
                <FontAwesomeIcon icon={faDog} /> Available to drop in:{" "}
              </p>{" "}
              {this.state.availableToDropIn ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faTimes} />
              )}
            </div>
            <div>
              <p>
                <FontAwesomeIcon icon={faWalking} /> Walks during the day:{" "}
              </p>{" "}
              {this.state.availableForWalks ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faTimes} />
              )}
            </div>
            <div>
              <p>Pets: </p>
              
              {pets.map(pet => (
              <ul key={pet.ownerId}>
              <li>{pet.dogsname}</li>
              <li>{pet.age}</li>
              <li>{pet.breed}</li>
              <li>{pet.gender}</li>
              
              </ul>
              ))}
             
            </div>
            <div>
              <p> Additional information: </p> {this.state.description}
            </div>
            <Button onClick={() => this.props.history.push('/my-profile')}>Edit My Profile</Button>
          </div>
          
        </div>
      </div>
    );
  }
}

export default IndividualProfile;
