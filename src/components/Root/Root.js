import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';



import SignUp from '../SignUp';
import 'bootstrap/dist/css/bootstrap.min.css'


class Root extends Component {
  render() {
    return (
      <Router>
        <div style={{ display: 'flex', width: '100%' }}>
          

          <div
            style={{
              flexGrow: 1,
              minHeight: '100vh',
              padding: 20,
              boxSizing: 'border-box',
            }}
          >
          <Route path="/" render={() => 'Hi'} />
          <Route path="/sign-up" component={SignUp} />
            
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
