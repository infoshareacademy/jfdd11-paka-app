import React, { Component } from "react";
import Login from "../Login";
import MyMap from "../MyMap";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PetOwnerFeatures from '../PetOwnerFeatures';
import PetOwner from '../PetOwner';
import SignUp from '../SignUp';
import ProfessionSelection from "../ProfessionSelection";
import UserDashboard from '../UserDashboard';
import NavigationBar from '../NavigationBar'
import firebase from 'firebase'
import IndividualProfile from '../IndividualProfile'

import 'bootstrap/dist/css/bootstrap.min.css'
import PopUpOwner from "../PopUpOwner";

import PetSitterWizard from "../PetSitterWizard";
import Chat from "../Chat";


class Root extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      })
    })
  }
  render() {
    const loggedIn = this.state.user !== null
    console.log(this.state.user, this.state.user !== null)
    return (
      <Router>
        <div style={{ display: "flex", width: "100%" }}>

          <div
            style={{
              flexGrow: 1,
              minHeight: "100vh",
              padding: 20,
              boxSizing: 'border-box'

            }}
          >
           {loggedIn && <NavigationBar />}
            <Route exact path="/" component={Login} />
            <Route exact path="/map" component={MyMap} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/profession-selection" component={ProfessionSelection} />
            <Route path="/petowner/petownerfeatures" component={PetOwnerFeatures} />
            <Route exact path="/petowner" component={PetOwner} />
            <Route exact path="/myprofile" component={UserDashboard} />
            <Route path="/petsitter" component={PetSitterWizard} />
            <Route path="/pop-up-owner/:userId" component={PopUpOwner} />
            <Route path="/myprofile/:userId" component={IndividualProfile} />
            <Route path="/chat" component={Chat} />
           
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
