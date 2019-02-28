import React, { Component } from "react";
import Login from "../Login";
import Map from "../Map";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PetOwnerFeatures from '../PetOwnerFeatures';
import PetOwner from '../PetOwner';
import SignUp from '../SignUp';
import ProfessionSelection from "../ProfessionSelection";
import UserProfile from '../UserProfile';
import NavigationBar from '../NavigationBar'
import firebase from 'firebase'

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
            <Route exact path="/map" component={Map} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/profession-selection" component={ProfessionSelection} />
            <Route path="/petowner/petownerfeatures" component={PetOwnerFeatures} />
            <Route exact path="/petowner" component={PetOwner} />
            <Route exact path="/myprofile" component={UserProfile} />
            <Route path="/petsitter" component={PetSitterWizard} />
            <Route path="/pop-up-owner/:userId" component={PopUpOwner} />
            <Route path="/chat" component={Chat} />
           
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
