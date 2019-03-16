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
    pets: [],
    isEditing: false
  };

  handleEditing = event => {
    this.setState({
      ...this.state,
      isEditing: true
    });
  };
  handleEditChange = event => {
    const userId = this.props.match.params.userId;
    const value = event.target.value;
    const eventName = event.target.name;
    if (event.keyCode === 13) {
      firebase
        .database()
        .ref(`users/${userId}`)
        .child(eventName)
        .set(value);

      this.setState({
        ...this.state,
        [event.target.name]: value,
        isEditing: false
      });
    }
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
    console.log(petId);
    console.log(this.state);
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
          <Card style={{ width: '90%', margin: '0 auto', marginBottom: '25px' }}>
            <CardImg
              src={this.state.photo + "&size=150x150"}
              alt="individualProfile"
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
              <p>Age: </p>{" "}
              <span onDoubleClick={this.handleEditing} style={viewStyle}>
                {this.state.age}{" "}
              </span>
              <input
                type="text"
                name="age"
                onKeyDown={this.handleEditChange}
                style={editStyle}
                defaultValue={this.state.age}
              />
            </div>
            <div>
              <p>Address:</p>{" "}
              <span name="address" style={viewStyle}>
                {this.state.address}
              </span>
              <input
                type="text"
                onKeyDown={this.handleEditChange}
                style={editStyle}
                defaultValue={this.state.address}
              />
            </div>
            <div>
              <p>Phone:</p>{" "}
              {/* <span name="phone"><a href={`tel:${this.state.phone}`}</a>
              </span> */}

              `/users/${userId}`}

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
            </div>
            <div className='petListUserProfileContainer'>
              <h5>Pets: </h5>

              {pets.map(pet => (
                <>
                <div className='petListUserProfile' key={pet.ownerId}>
               
                    <img src={pet.photo} alt='pet photo' />
                 <ul>
                  <li>Name: {pet.dogsname}</li>
                  <li>Age: {pet.age}</li>
                  <li>Breed: {pet.breed}</li>
                  <li>Gender: {pet.gender}</li>
                  <li>Description: {pet.description}</li>
                  </ul>
                  </div>
                  <div>
                    <Button className='deleteDogButton' onClick={() => this.deletePet(pet.id)}>
                      Delete dog
                    </Button>
                  </div>
                  </>
              ))}
            </div>
            <div style={{ padding: '30px' }}>
              <h5 name="description" style={viewStyle}>
                {this.state.description}Additional information:{" "}
              </h5>{" "}
              {this.state.description}
              <input
                type="text"
                onKeyDown={this.handleEditChange}
                style={editStyle}
                defaultValue={this.state.description}
              />
            </div>

            {/* {userId === currentUserId && (
              <Button onClick={() => this.handleEditing()}>
                Edit My Profile
              </Button>
            )} */}
            {userId === currentUserId && (
            <Button onClick={() => this.props.history.push('/my-profile')}>Edit My Profile</Button>
            )}
        </div>
      </div>
    );
  }
}
export default IndividualProfile;
