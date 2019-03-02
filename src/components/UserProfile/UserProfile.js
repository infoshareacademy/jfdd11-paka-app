import React, { Component } from "react";
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
import MyMap from "../MyMap";
import IndividualProfile from '../IndividualProfile'

import "./UserProfile.css";

class UserProfile extends Component {
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
    city: "",
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
    console.log(e.target.checked, e.target.id, e.target);
    this.setState({
      [e.target.id]: e.target.checked
    });
  };

  componentDidMount() {
    const { userId } = this.props.match.params;

    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        firebase
          .database()
          .ref(`users`)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(users => {
            this.setState({ users: Object.values(users) });
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
    const userId = firebase.auth().currentUser.uid;

    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="UserProfile"
      >
        <div>
          <p>Hello there!</p>
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
              <Row>
                <Col sm="6">
                  <Card body>
                    {/* <CardTitle>Search</CardTitle> */}
                    <FormGroup>
                      <Input
                        type="search"
                        name="search"
                        id="exampleSearch"
                        value={this.state.searchPhrase}
                        onChange={this.handleChange}
                        placeholder="Search by name, surname, city and age"
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
                                  Day Care at petsitter's home
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
                                  House sitting at your place
                                </Label>
                              </FormGroup>
                            </Form>
                            <Form>
                              <FormGroup check inline>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    id="schedule"
                                    checked={schedule}
                                    onChange={this.handleCheckboxChange}
                                  />{" "}
                                  Available for walks
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
                                  Available to drop in
                                </Label>
                              </FormGroup>
                            </Form>
                          </CardBody>
                        </Card>
                      </UncontrolledCollapse>
                    </div>
                  </Card>
                </Col>
              </Row>
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
                      user.name +
                      user.surname +
                      user.adress +
                      user.age
                    ).toLocaleLowerCase()
                  }))
                  .filter(user =>
                    user.searchData.includes(
                      this.state.searchPhrase.toLocaleLowerCase()
                    )
                  )
                  .map(user => (
                    <Card key={user.id}>
                      <CardBody>
                        <CardTitle>{user.name}</CardTitle>
                        <CardSubtitle>{user.age}</CardSubtitle>
                        <p>
                          housesitting:{" "}
                          {user.housesitting ? (
                            <span>yes</span>
                          ) : (
                            <span>no</span>
                          )}
                        </p>
                        <p>
                          Day care:{" "}
                          {user.daycare ? <span>yes</span> : <span>no</span>}
                        </p>
                        <p>
                          Available for walk:{" "}
                          {user.schedule ? <span>yes</span> : <span>no</span>}
                        </p>
                        <p>
                          Available to drop in:{" "}
                          {user.visits ? <span>yes</span> : <span>no</span>}
                        </p>
                      </CardBody>
                      <div style={{ textAlign: "center" }}>
                        <img src={user.photo + "&size=150x150"} alt="user" />
                      </div>
                      <CardBody>
                        <CardText>{user.adress}</CardText>
                        <CardLink><Link to={`/individual-profile/${user.id}`}> See Full Profile</Link></CardLink>
                        <CardLink href="#">Send a Message</CardLink>
                      </CardBody>
                    </Card>
                  ))}
              </div>
            </TabPane>
            <TabPane tabId="2">
              <MyMap users={this.state.users}/>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default UserProfile;
