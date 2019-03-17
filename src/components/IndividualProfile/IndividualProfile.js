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
import avataaars from '../images/avataaars.png'
import firebase from "firebase";
import "./IndividualProfile.css";

class IndividualProfile extends Component {
  state = {
    name: "",
    surname: "",
    age: "",
    phone: '',
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
              ...this.state,
              name: user.name,
              surname: user.surname,
              phone: user.phone,
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
              pets: Object.entries(pets || {})
                .filter(([, { ownerId }]) => ownerId === userId)
                .map(([id, value]) => ({ id, ...value }))
            });
          });
      }
    });
  }

  deletePet = petId => {
    firebase
      .database()
      .ref(`pets`)
      .child(petId)
      .remove()
      .then(() => {
        this.setState({
          pets: this.state.pets.filter(pet => petId !== pet.id)
        });
      });
  };

  render() {
    const currentUser = firebase.auth().currentUser;
    const currentUserId = currentUser && currentUser.uid;
    let editStyle = {};
    let viewStyle = {};
    if (this.state.isEditing) {
      viewStyle.display = "none";
    } else {
      editStyle.display = "none";
    }
    const userId = this.props.match.params.userId;

    const { pets } = this.state;
   
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
          <Card style={{ width: '90%', margin: '0 auto', marginBottom: '25px',  
                        padding: 20,
                        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.5)"
                      }}>
           {this.state.photo ? <CardImg
              src={this.state.photo + "&size=150x150"}
              alt="individualProfile"
            /> : <img src={avataaars} alt='user avatar'  style={{ width: '100%' }}></img> }
          </Card>
          <div>
          {userId === currentUserId && (
            <Button style={{ float: 'right', marginRight: '20px', marginBottom: '20px' }} onClick={() => this.props.history.push('/my-profile')}>Edit</Button>
            )}
            </div>
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
              <p>Age: </p>{" "}
              <span>
                {this.state.age}{" "}
              </span>
            </div>
            <div>
              <p>Address:</p>{" "}
              <span name="address">
                {this.state.address}
              </span>
            </div>
            <div style ={{ paddingBottom: '30px' }}>
              <p>Phone:</p>{" "}
              <span name="phone">
                <a href={`tel:${this.state.phone}`}>{this.state.phone}</a>
              </span>
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
                  <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} style={{ color: '#f36f5a' }}/>
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
                  <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }}/>
                ) : (
                  <FontAwesomeIcon icon={faTimes} style={{ color: '#f36f5a' }}/>
                )}
              </span>
            </div>
            <div>
              <p>
                {" "}
                <FontAwesomeIcon icon={faDog} /> Available to drop in:{" "}
              </p>{" "}
              {this.state.availableToDropIn ? (
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }}/>
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{ color: '#f36f5a' }} />
              )}
            </div>
            <div>
              <p>
                <FontAwesomeIcon icon={faWalking} /> Walks during the day:{" "}
              </p>{" "}
              {this.state.availableForWalks ? (
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{ color: '#f36f5a' }} />
              )}
            </div>
            </div>
            <div className='petListUserProfileContainer'>
             {pets && <h5>Pets: </h5>} 

              {pets.map(pet => (
                <>
                <div style={{ margin: '20px auto',
                        padding: 10,
                        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.5)"
                      }} className='petListUserProfile' key={pet.ownerId}>
               
                    <img src={pet.photo} alt='pet photo' />
                 <ul>
                  <li>Name: {pet.dogsname}</li>
                  <li>Age: {pet.age}</li>
                  <li>Breed: {pet.breed}</li>
                  <li>Gender: {pet.gender}</li>
                 {pet.description &&  <li>Description: {pet.description}</li>}
                  </ul>
  
                  </div>
                  <div>
                  {userId === currentUserId && (
                    <Button className='deleteDogButton' onClick={() => this.deletePet(pet.id)}>
                      Delete pet
                    </Button>
            )}
                  </div>
                  </>
              ))}
            </div>
            <div style={{ padding: '30px' }}>
              <h5 name="description" style={viewStyle}>
                {this.state.description}Additional information:{" "}
              </h5>{" "}
              {this.state.description}
            </div>
        </div>
      </div>
    );
  }
}
export default IndividualProfile;
