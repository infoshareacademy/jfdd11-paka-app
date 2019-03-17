import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faGlobeAmericas,
  faUser,
 faUsers,
 faSignOutAlt,
  faDog
} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { withRouter, NavLink as RNavLink} from "react-router-dom";
import homezoonew from "../images/homezoonew.png";

import "./NavigationBar.css";
import { withAuth } from "../../context/AuthContext";

class NavigationBar extends Component {

  state = {
    collapsed: true
  }
  toggleNavbar = () => {
    this.setState({
       collapsed: !this.state.collapsed
    })
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setTimeout(() => {
          this.props.history.push("/");
        }, 0)
        
      });
  };

  render() {
    const { user } = this.props.authContext
    if (user === null) {
      return null
    }
    const userId = user.uid;
    return (
      <div className="NavigationBar">
        <Navbar style={{ display: 'flex',
    justifyContent: 'space-between' }} color="light" light expand="md">
          <NavbarBrand className="mr-auto"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              cursor: 'pointer'
            }}
          >
            {" "}
            <img className="Nav-login-logo" src={homezoonew} alt="logo" onClick={() => this.props.history.push("/users")} />
            <span
              className="Nav-span"
              style={{
                fontSize: "50",
                color: "#f36f5a",
                fontWeight: "bolder",
                fontFamily: "'Chango', cursive"
              }}
            >
              HomeZoo
            </span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/pets" tag={RNavLink} onClick={this.toggleNavbar}>  <FontAwesomeIcon icon={faPaw} />Pets</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/registerpet" tag={RNavLink} onClick={this.toggleNavbar}> <FontAwesomeIcon icon={faDog} />Add a pet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/map/" tag={RNavLink} onClick={this.toggleNavbar}><FontAwesomeIcon icon={faGlobeAmericas} />Map</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`/users/${userId}`} tag={RNavLink} onClick={this.toggleNavbar}>
                <FontAwesomeIcon icon={faUser} />My profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/users" tag={RNavLink} onClick={this.toggleNavbar}><FontAwesomeIcon icon={faUsers} />Users</NavLink>
              </NavItem>
              <NavItem onClick={this.logOut}>
                <NavLink><FontAwesomeIcon icon={faSignOutAlt} />({user.email}) Log out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
 

export default withAuth(withRouter(NavigationBar));
