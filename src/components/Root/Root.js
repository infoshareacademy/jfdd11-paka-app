import React, { Component } from "react";
import Login from "../Login";
import Map from "../Map";
import { BrowserRouter as Router, Route } from 'react-router-dom';

<<<<<<< HEAD
import PetSitterFeatures from '../PetSitterFeatures';
import PetSitter from '../PetSitter';
import PetOwnerPage from '../PetOwnerPage';
=======
import PetOwnerFeatures from '../PetOwnerFeatures';
import PetOwner from '../PetOwner';
>>>>>>> d00e9af13f078446ce7e46c2a93771d8e0c26f32
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
              boxSizing: 'border-box'

            }}
          >
            <Route exact path="/" component={Login} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/profession-selection" component={ProfessionSelection} />
            <Route path="/petowner/petownerfeatures" component={PetOwnerFeatures} />
            <Route exact path="/petowner" component={PetOwner} />

          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
