import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login";
import Map from "../Map";

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
            <Route exact path="/login" component={Login} />
            <Route exact path="/map" component={Map} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
