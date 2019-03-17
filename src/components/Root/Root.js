import React, { Component } from "react";
import Login from "../Login";
import MyMap from "../MyMap";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from '../SignUp';
import UserDashboard from '../UserDashboard';
import NavigationBar from '../NavigationBar'
import firebase from 'firebase'
import IndividualProfile from '../IndividualProfile'
import PetSitterWizard from "../PetSitterWizard";
import PetsList from "../PetsList";
import MyPets from "../MyPets";
import PetOwnerWizard from "../PetOwnerWizard";
import Chat from "../Chat";
import Homepage from "../Homepage";
import IconChat from "../IconChat/IconChat";
import FormMap from "../FormMap/FormMap";

class Root extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
    });
  }
  render() {
    const loggedIn = this.state.user !== null;
    return (
      <Router>
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              flexGrow: 1,
              minHeight: "100vh",
              boxSizing: "border-box"
            }}
          >
            {loggedIn && <NavigationBar />}
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/map" component={MyMap} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route path="/registerpet" component={PetOwnerWizard} />
            <Route path="/pets" component={PetsList} />
            <Route path="/my-pets" component={MyPets} />
            <Route path="/my-profile" component={PetSitterWizard} />
            <Route path="/chat" component={Chat} />
            <IconChat />
            <Route
              exact
              path="/users/:userId"
              component={props => (
                <IndividualProfile {...props} key={props.match.params.userId} />
              )}
            />
            <Route exact path="/users" component={UserDashboard} />
            <Route exact path="/formmap" component={FormMap} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
