import React, { Component } from "react";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHome,
  faCouch,
  faWalking,
  faDog
} from "@fortawesome/free-solid-svg-icons";
import avataaars from '../../components/images/avataaars.png'

import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  UncontrolledCollapse,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import MyMap from "../MyMap";

import "./UserDashboard.css";

class UserDashboard extends Component {
  state = {
    users: [],
    activeTab: "1",
    searchPhrase: "",
    daycare: false,
    housesitting: false,
    schedule: false,
    visits: false,
    hasDogs: false,
    name: "",
    surname: "",
    age: "",
    city: "",
    phone: "",
    pets: []
  };

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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
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
          pets: Object.entries(pets || {}).map(([id, value]) => ({
            id,
            ...value
          }))
        });
      });
  }

  render() {
    const {
      users,
      housesitting,
      daycare,
      schedule,
      hasDogs,
      visits,
      pets
    } = this.state;
    const isDayCare = daycare ? user => user.daycare : () => true;
    const isHouseSitting = housesitting
      ? user => user.housesitting
      : () => true;
    const isVisiting = visits ? user => user.visits : () => true;
    const isWalking = schedule ? user => user.schedule : () => true;
    const hasDogsPredicate = hasDogs
      ? user => pets.some(pet => pet.ownerId === user.id)
      : () => true;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
        className="UserDashboard
      "
      >
        <div
          className="UserDashboard"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingBottom: "150"
          }}
        >
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Browse users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                See users near you
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Card body style={{ textAlign: "center" }}>
                <FormGroup>
                  <Input
                    style={{ width: "60vw", margin: '0 auto'}}
                    type="search"
                    name="search"
                    id="exampleSearch"
                    value={this.state.searchPhrase}
                    onChange={this.handleChange}
                    placeholder="Search by name, surname or city"
                  />
                </FormGroup>
                <div>
                  <Button className='btn btn-secondary'
                    color="secondary"
                    id="toggler"
                    style={{ marginBottom: "1rem" }}
                  >
                    Advanced Search
                  </Button>
                  <UncontrolledCollapse toggler="#toggler">
                    <Card>
                      <CardBody>
                        <Form>
                          <FormGroup check inline style={{ textAlign: 'left' }}>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="hasDogs"
                                checked={hasDogs}
                                onChange={this.handleCheckboxChange}
                              />{" "}
                              <FontAwesomeIcon icon={faDog} /> Has dogs
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="daycare"
                                checked={daycare}
                                onChange={this.handleCheckboxChange}
                              />{" "}
                              <FontAwesomeIcon icon={faCouch} /> Day-care at
                              petsitter's home
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="housesitting"
                                checked={housesitting}
                                onChange={this.handleCheckboxChange}
                              />{" "}
                              <FontAwesomeIcon icon={faHome} /> House-sitting at
                              dog-owner's place
                            </Label>
                          </FormGroup>
                        </Form>
                        <Form style={{textAlign: 'left' }}>
                          <FormGroup check inline>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="schedule"
                                checked={schedule}
                                onChange={this.handleCheckboxChange}
                                />{" "}
                              <FontAwesomeIcon icon={faWalking} /> Daily walks
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="visits"
                                checked={visits}
                                onChange={this.handleCheckboxChange}
                              />{" "}
                              <FontAwesomeIcon icon={faEye} />Drop-in visits
                            </Label>
                          </FormGroup>
                        </Form>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              </Card>
              <div>
                {users
                  .map(user => ({
                    ...user,
                    searchData: (
                      (user.name || "") +
                      (user.surname || "") +
                      (user.adress || "")
                    ).toLocaleLowerCase()
                  }))
                  .filter(user =>
                    user.searchData.includes(
                      this.state.searchPhrase.toLocaleLowerCase()
                    )
                  )
                  .filter(isDayCare)
                  .filter(isHouseSitting)
                  .filter(isVisiting)
                  .filter(isWalking)
                  .filter(hasDogsPredicate)
                  .map(user => (
                    <div
                      className="userContainer"
                      key={user.id + Date.now()}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 20,
                        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.5)",
                        margin: "20px 0"
                      }}
                    >
                      <h3>
                        {user.name} {user.surname}
                      </h3>
                      <div
                        style={{ textAlign: "center", paddingBottom: "20px" }}
                      >
                        <Link
                          to={`/users/${user.id}`}
                          style={{ textAlign: "center" }}
                        >
                         {user.photo ? <img
                            src={user.photo}
                            alt="user"
                            style={{ maxWidth: "100%", maxHeight: 100 }}
                          /> : <img src={avataaars} alt='user avatar'  style={{ maxWidth: "100%", maxHeight: 100 }}></img> } 
                        </Link>
                      </div>
                      <div>
                        {user.adress}
                        {", "}
                        {user.age}
                      </div>
                      <div
                        className="iconsContainer"
                        style={{ display: "flex" }}
                      >
                        <div>
                          {user.housesitting ? (
                            <FontAwesomeIcon icon={faHome} />
                          ) : (
                            false
                          )}
                        </div>
                        <div>
                          {user.daycare ? (
                            <FontAwesomeIcon icon={faCouch} />
                          ) : (
                            false
                          )}
                        </div>
                        <div>
                          {user.schedule ? (
                            <FontAwesomeIcon icon={faWalking} />
                          ) : (
                            false
                          )}
                        </div>
                        <div>
                          {user.visits ? (
                            <FontAwesomeIcon icon={faEye} />
                          ) : (
                            false
                          )}
                        </div>
                        <div>
                          {pets.some(pet => pet.ownerId === user.id) ? (
                            <FontAwesomeIcon icon={faDog} />
                          ) : (
                            false
                          )}
                        </div>
                      </div>

                      <Link
                        to={`/users/${user.id}`}
                        style={{ textAlign: "center" }}
                      >
                        See Full Profile
                      </Link>
                    </div>
                  ))}
              </div>
            </TabPane>
            <TabPane tabId="2">
              {users.length > 0 && this.state.activeTab === "2" && <MyMap />}
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
