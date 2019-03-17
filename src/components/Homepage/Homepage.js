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
      <div className="Homepage" style={{ display: 'flex', backgroundColor: 'white'}}>
         <div>
        <Nav tabs style={{ justifyContent: 'center', alignItems: 'center'}}>
          <NavItem>
            <NavLink style={{backgroundColor: 'white'}}
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Log in
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{backgroundColor: 'white'}}
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Sign up
            </NavLink>
          </NavItem>
          <div className="logo" style={{ paddingLeft: '20', paddingTop: '18px'}}>
            <img className="login-logo" src={homezoonew} alt="logo" />
            <h4
              style={{
                color: "#f36f5a",
                fontFamily: "'Chango', cursive",
                fontWeight: "bold",
                fontSize: "50",
                lineHeight: "0",
                paddingBottom: '10' 
              }}
            >
              HomeZoo
            </h4>
          </div>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
               <Login />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <SignUp />
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
