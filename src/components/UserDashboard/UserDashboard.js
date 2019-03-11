import React, { Component } from "react";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faCouch,
  faWalking,
  faDog
} from "@fortawesome/free-solid-svg-icons";

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
  CardTitle
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
    name: "",
    surname: "",
    age: "",
    city: ""
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
  }

  render() {
    const { users, housesitting, daycare, schedule, visits } = this.state;
    const isDayCare = daycare ? user => user.daycare : user => [...users];
    const isHouseSitting = housesitting
      ? user => user.housesitting
      : user => [...users];
    const isVisiting = visits ? user => user.visits : user => [...users];
    const isWalking = schedule ? user => user.schedule : user => [...users];

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
        <div className='UserDashboard'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
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
                    style={{ width: "60vw" }}
                    type="search"
                    name="search"
                    id="exampleSearch"
                    value={this.state.searchPhrase}
                    onChange={this.handleChange}
                    placeholder="Search by name, surname or city"
                  />
                </FormGroup>
                <div>
                  <Button
                    color="primary"
                    id="toggler"
                    style={{ marginBottom: "1rem" }}
                  >
                    Advanced Search
                  </Button>
                  <UncontrolledCollapse toggler="#toggler">
                    <Card>
                      <CardBody>
                        <Form>
                          <FormGroup check inline>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="daycare"
                                checked={daycare}
                                onChange={this.handleCheckboxChange}
                              />{" "}
                              <FontAwesomeIcon icon={faCouch} /> Day Care at
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
                        <Form style={{ display: "flex", flexDirection: "row" }}>
                          <FormGroup check inline>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="schedule"
                                checked={schedule}
                                onChange={this.handleCheckboxChange}
                              />
                              <FontAwesomeIcon icon={faWalking} /> Walks
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
                              <FontAwesomeIcon icon={faDog} /> Drop-in visits
                            </Label>
                          </FormGroup>
                        </Form>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              </Card>
              {/* </Col> */}
              {/* </Row> */}
              {/* <Row>
              <Col sm="12">
                <h4> </h4>
              </Col>
            </Row> */}
              <div>
                {this.state.users
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
                  .map(user => (
                    <Card key={user.id + Date.now()}>
                      <CardBody>
                        <CardTitle>
                          {user.name} {user.surname}
                        </CardTitle>
                        <div
                          style={{ textAlign: "center", paddingBottom: "20px" }}
                        >
                          <img
                            src={user.photo}
                            alt="user"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <CardSubtitle>
                          {user.adress}
                          {", "}
                          {user.age}
                        </CardSubtitle>
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
                              <FontAwesomeIcon icon={faDog} />
                            ) : (
                              false
                            )}
                          </div>
                        </div>
                        <CardLink tag={Link} to={`/users/${user.id}`}>
                          {" "}
                          See Full Profile of {user.name}
                        </CardLink>
                      </CardBody>
                    </Card>
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
