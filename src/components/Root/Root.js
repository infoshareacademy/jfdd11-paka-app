import React, { Component } from "react";
import Login from "../Login";
import MyMap from "../MyMap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "../SignUp";
import ProfessionSelection from "../ProfessionSelection";
import UserDashboard from "../UserDashboard";
import NavigationBar from "../NavigationBar";
import firebase from "firebase";
import IndividualProfile from "../IndividualProfile";

import "bootstrap/dist/css/bootstrap.min.css";

import PetSitterWizard from "../PetSitterWizard";
import PetsList from "../PetsList";
import PetOwnerWizard from "../PetOwnerWizard";
import Chat from "../Chat";
import Homepage from "../Homepage";
import MyProfile from "../MyProfile/MyProfile";

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
              padding: 20,
              boxSizing: "border-box"
            }}
          >
            {loggedIn && <NavigationBar />}
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/map" component={MyMap} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route
              exact
              path="/profession-selection"
              component={ProfessionSelection}
            />
            <Route path="/registerpet" component={PetOwnerWizard} />
            <Route path="/mypets" component={PetsList} />
            <Route path="/petsitter" component={PetSitterWizard} />
            <Route exact path="/users/:userId" component={IndividualProfile} />
            <Route exact path="/chat" component={Chat} />
            <Route path="/my-profile" component={MyProfile} />
            <Route exact path="/users" component={UserDashboard} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
