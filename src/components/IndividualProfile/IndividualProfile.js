import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faHome,
  faCouch,
  faWalking,
  faDog,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
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
              alt="My profile"
            />
            </Card>
            <div className='IndividualProfileText' style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between', width: '80vw', margin: '0 auto'}}>
             <div><p>Age: </p> <span>{this.state.age}</span></div>
              <div><p>Address:</p> <span>{this.state.address}</span></div>
              <h5 style={{ fontWeight: 'bold', paddingTop: '20', paddingBottom: '10' }}> Available for: </h5>
              <div className='cardTextRow'><p><FontAwesomeIcon icon={faCouch} /> {' '} {' '}Day-care at pet-sitter's place: </p> <span> {this.state.dayCareAtPetsitters ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</span></div>
              <div><p>  <FontAwesomeIcon icon={faHome} /> {' '}House-sitting at dog-owner place:</p> <span>{this.state.houseSittingAtYourPlace ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</span></div>
              <div><p> <FontAwesomeIcon icon={faDog} /> {' '} Available to drop in: </p> {this.state.availableToDropIn ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</div>
              <div><p><FontAwesomeIcon icon={faWalking} />{' '} Walks during the day: </p> {this.state.availableForWalks ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</div>
              <div><p> Additional information: </p>  {this.state.description}</div>
              
            </div>
        </div>
      </div>
    );
  }
}

export default IndividualProfile;


