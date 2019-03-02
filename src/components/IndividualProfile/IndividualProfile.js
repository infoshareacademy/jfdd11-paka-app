import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import firebase from 'firebase'


import "./IndividualProfile.css";

class IndividualProfile extends Component {

  state = {
    name: '',
    surname: '',
    email: '',
    address: '',
    age: '',
    photo: ''
  }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser !== null) {
          const userId = currentUser.uid;
          firebase
            .database()
            .ref(`users`)
            .child(userId)
            .once("value")
            .then(snapshot => console.log(snapshot.val()))
            .then(user => {
              this.setState({ 
                name: user.name,
                surname: user.surname,
                email: user.email,
                address: user.adress,
                age: user.age,
                photo: user.photo
              })
             })
            }
          })
        }
    
        
  

  render() {
    console.log(this.state)
    return (
      <div className="IndividualProfile">
        {this.state.name}
        <div>
          <Card>
            <CardImg
              top
              width="100%"
              src={this.state.photo + "&size=350x250"}
              alt="Individual profile"
            />
            <CardBody>
              <CardTitle>{this.state.address}</CardTitle>
              <CardSubtitle>{this.state.age}</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default IndividualProfile;
