import React, { Component } from 'react'
import firebase from "firebase";
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  UncontrolledCollapse,
  Button,
  CardLink,
  CardSubtitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import './PetsList.css'

class PetsList extends Component {
state = {
  pets: [],
  dogsname: "",
  age: "",
  breed: "",
  gender: "",
  dayCare: false,
  dayNightCare: false,
  dogWalking: false,
  dropIn: false,
  description: '',
  file: null
};

/*
handleChange = event => {
  this.setState({
    searchPhrase: event.target.value
  });
};

toggle = tab => {
  this.setState({
    activeTab: tab
  });
};
handleCheckboxChange = e => {
  this.setState({
    [e.target.id]: e.target.checked
  });
};
*/

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
    const { pets, housesitting, dayCare, dogWalking
  , dropIn } = this.state;
    /*const isdayCare = dayCare ? pet => pet.dayCare : pet => [...pets];
    const isHouseSitting = housesitting ? pet => pet.housesitting : pet => [...pets];
    const isVisiting = dropIn ? pet => pet.dropIn : pet => [...pets];
    const isWalking = dogWalking
 ? pet => pet.dogWalking
 : pet => [...pets];*/

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="PetsList">
      <div>
        
            {/* <Row>
            <Col sm="12">
              <h4> </h4>
            </Col>
          </Row> */}
            <div >
              {this.state.pets
                .map(pet => (
                  <Card key={pet.id}>
                    <CardBody>
                      <CardTitle>{pet.dogsname}</CardTitle>
                      <CardSubtitle>{pet.age}</CardSubtitle>
                      <p>
                        housesitting:{" "}
                        {pet.dayNightCare ? (
                          <span>yes</span>
                        ) : (
                          <span>no</span>
                        )}
                      </p>
                      <p>
                        Day care:{" "}
                        {pet.dayCare ? <span>yes</span> : <span>no</span>}
                      </p>
                      <p>
                        Available for walk:{" "}
                        {pet.dogWalking
                       ? <span>yes</span> : <span>no</span>}
                      </p>
                      <p>
                        Available to drop in:{" "}
                        {pet.dropIn ? <span>yes</span> : <span>no</span>}
                      </p>
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


