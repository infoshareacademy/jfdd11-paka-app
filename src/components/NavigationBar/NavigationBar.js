import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
  import firebase from 'firebase'
  import { withRouter } from 'react-router-dom'

import './NavigationBar.css'

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
    firebase.auth().signOut()
    .then(() => {
      this.props.history.push('/')
    })
  }

  render() {
    return (
     
      <div className="NavigationBar">

        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">HomeZoo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/map/">Map</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/petowner/petownerfeatures">Add your dog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/petowner/petownerfeatures"> Become a petsitter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/chat">Chat</NavLink>
              </NavItem>
              <NavItem onClick={this.logOut}>
                <NavLink>Log out</NavLink>
              </NavItem>
               
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      
    )
  }
}

export default withRouter(NavigationBar)