import React, { Component } from "react";
import Login from "../Login";
import Map from "../Map";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from '../SignUp';
import 'bootstrap/dist/css/bootstrap.min.css'
import ProfessionSelection from "../ProfessionSelection";


class Root extends Component {
  render() {
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
            <Route exact path="/" component={Login} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/profession-selection" component={ProfessionSelection} />
            
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
