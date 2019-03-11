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
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import homezoonew from "../images/homezoonew.png";

import "./NavigationBar.css";

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
        this.props.history.push("/");
      });
  };

  render() {
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
                <NavLink href="/mypets">User's pets</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/registerpet">Register-Pet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/map/">Map</NavLink>
              </NavItem>

               <NavItem>
                <NavLink href="/petowner/petownerfeatures">
                  Add your dog
                </NavLink>

              </NavItem>
              <NavItem>
                <NavLink href="/petsitter">
                <Navlink />
              </NavItem> 
              <NavItem>
                <NavLink href="/petowner/petownerfeatures">

                  {" "}
                  Become a petsitter
                  <Navlink />
              </NavItem>
              <NavItem>
                <NavLink href="/my-profile">
                  My profile

                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/users/">Users</NavLink>
              </NavItem>
              <NavItem onClick={this.logOut}>
                <NavLink>Log out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavigationBar);
