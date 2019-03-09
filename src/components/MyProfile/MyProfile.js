import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody
} from "reactstrap";
import './MyProfile.css';
import firebase from 'firebase';

class MyProfile extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    address: '',
    phone: '',
    photo: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        const userId = currentUser.uid;
        const email = currentUser.email;
        console.log(userId)
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
              email: email,
              address: user.adress,
              phone: user.phone,
              photo: user.photo
            });
          });
      }
    });
  }

  render() {
    console.log(this.state.name)
    return (

      <div className="MyProfile">
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
            <CardBody>
              <CardText className={'cardText'}>
             <div><p>Age: </p> <span>{this.state.age}</span></div>
              <div><p>Address:</p> <span>{this.state.address}</span></div>
              
              <h5 style={{ fontWeight: 'bold', paddingTop: '20' }}> Available for: </h5>
              <div className='cardTextRow'><p>Day-care at pet-sitter's place: </p> <span> {this.state.dayCareAtPetsitters ? <span>{' '} Yes</span> : <span>{' '}No</span>}</span></div>
              <div><p>House-sitting at the dog-owner place:</p> <span>{this.state.houseSittingAtYourPlace ? <span>{' '} Yes</span> : <span>{' '}No</span>}</span></div>
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


export default MyProfile
