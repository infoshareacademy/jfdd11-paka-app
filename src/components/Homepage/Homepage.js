import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import SignUp from '../SignUp'
import Login from '../Login'
import homezoonew from "../images/homezoonew.png";
import {withAuth} from '../../context/AuthContext';
import {Redirect} from 'react-router-dom';

import './Homepage.css'

class Homepage extends Component {

  state = {
    activeTab: "1"
  }
  toggle = tab => {
    this.setState({
      activeTab: tab
    });
  };

  render() {
    return (
      <div className="Homepage">
      <div style={{ textAlign: "center", paddingTop: '90px'}} className="logo">
            <img className="login-logo" src={homezoonew} alt="logo" />
            <h1
              style={{
                color: "#f36f5a",
                fontFamily: 'monospace',
                fontWeight: "bold",
                fontSize: "50",
                lineHeight: "0"
              }}
            >
              HomeZoo
            </h1>
          </div>
          <br></br>
          <br></br>
          <br></br>
         <div>
        <Nav tabs style={{ justifyContent: 'center'}}>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Log in
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Sign up
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
               <Login />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <SignUp />
              </Col>
              <Col sm="6">
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      {this.props.authContext.user && <Redirect to="/users" />}
      </div>
    )
  }
}

export default withAuth(Homepage)
