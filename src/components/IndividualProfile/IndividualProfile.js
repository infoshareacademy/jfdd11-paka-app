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
import firebase from "firebase";


import "./IndividualProfile.css";

class IndividualProfile extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    age: ""
  };

  componentDidMount() {

    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        const userId = currentUser.uid;
       
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
              email: user.email,
              age: user.age
            });
          });
      }
    });
  }

  render() {
    console.log(this.state.name);
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
              <CardTitle>{this.state.email}</CardTitle>
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
