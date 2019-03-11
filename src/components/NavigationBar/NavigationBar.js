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

 

export default withRouter(NavigationBar);
