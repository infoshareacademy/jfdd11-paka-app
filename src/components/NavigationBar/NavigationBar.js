import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faGlobeAmericas,
  faUser,
 faUsers,
 faSignOutAlt,
  faHome,
  faCouch,
  faWalking,
  faDog,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { withRouter, NavLink as RNavLink} from "react-router-dom";
import homezoonew from "../images/homezoonew.png";

import "./NavigationBar.css";
import { withAuth } from "../../context/AuthContext";

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
        <Navbar color="light" light expand="md">
          <NavbarBrand
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline"
            }}
          >
            {" "}
            <img className="Nav-login-logo" src={homezoonew} alt="logo" onClick={() => this.props.history.push("/users")} />
            <span
              className="Nav-span"
              style={{
                fontSize: "60",
                color: "#f36f5a",
                fontWeight: "bolder",
                fontFamily: 'monospace'
              }}
            >
              HomeZoo
            </span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/pets" tag={RNavLink}>  <FontAwesomeIcon icon={faPaw} />Pets</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink href="/my-pets">My pets</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink to="/registerpet" tag={RNavLink}> <FontAwesomeIcon icon={faDog} />Add a pet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/map/" tag={RNavLink}><FontAwesomeIcon icon={faGlobeAmericas} />Map</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`/users/${userId}`} tag={RNavLink}>
                <FontAwesomeIcon icon={faUser} />My profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/users" tag={RNavLink}><FontAwesomeIcon icon={faUsers} />Users</NavLink>
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
