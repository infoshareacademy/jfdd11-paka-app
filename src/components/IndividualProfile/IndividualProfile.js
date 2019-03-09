import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody
} from "reactstrap";
import firebase from "firebase";

import "./IndividualProfile.css";

class IndividualProfile extends Component {
  state = {
    name: "",
    surname: "",
    age: "",
    address: '',
    description: '',
    dayCareAtPetsitters: '',
    houseSittingAtYourPlace:'',
    availableToDropIn: '',
    availableForWalks: ''
  };

  componentDidMount() {

    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        const userId = this.props.match.params.userId
       
        firebase
          .database()
          .ref(`users/${userId}`)
          .once('value')
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
      }
    });
  }

  render() {
    return (
      <div className="IndividualProfile">
      <br></br>
        <h1 style={{ textAlign: 'center' }}>{this.state.name}{'  '}{this.state.surname}</h1>
        <br></br>
        <div>
          <Card>
            <CardImg
              top
              width="100%"
            src={this.state.photo + "&size=150x150"}
              alt="Individual profile"
            />
            <CardBody>
              <CardText className={'cardText'}>
             <div><p>Age: </p> <span>{this.state.age}</span></div>
              <div><p>Address:</p> <span>{this.state.address}</span></div>
              
              <h5 style={{ fontWeight: 'bold', paddingTop: '20' }}> Available for: </h5>
              <div className='cardTextRow'><p>Day care at pet-sitter's place: {' '}</p> <span> {this.state.dayCareAtPetsitters ? <span>{' '} Yes</span> : <span>{' '} No</span>}</span></div>
              <div><p>House-sitting at dog-owner's place: {' '}</p> <span>{this.state.houseSittingAtYourPlace ? <span>{' '} Yes</span> : <span>{' '} No</span>}</span></div>
              <div><p>Available to drop in: </p> {this.state.availableToDropIn ? <span>{' '} Yes</span> : <span>{' '} No</span>}</div>
              <div><p>Walks during the day: </p> {this.state.availableForWalks ? <span>}{' '} Yes</span> : <span>{' '} No</span>}</div>
              <div><p> Additional information: </p>  {this.state.description}</div>
              </CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default IndividualProfile;


