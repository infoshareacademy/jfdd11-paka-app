import React, { Component } from 'react'
import firebase from 'firebase'
import { Card, Button, CardBody, CardLink,CardSubtitle ,TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import MyMap from '../MyMap'

import './UserProfile.css'

class UserProfile extends Component {
  state = {
    users: [],
    activeTab: '1',
    searchPhrase: '',
  };

  handleChange = event => {
    this.setState({
      searchPhrase: event.target.value
    });
  }

  toggle = tab => { 
    this.setState({
    activeTab: tab
  })
}
  componentDidMount() {
     
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        firebase
        .database()
        .ref(`users`)
        .once('value')
        .then(snapshot => snapshot.val())
        .then(users => {
          this.setState({ users: Object.values(users) })
        })
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <div style={{display: 'flex', 
      flexDirection: 'column'
}} className="UserProfile">
   <div>
   <p>Hello there!</p>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Browse users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
            See users near you
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
               <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Advanced search</CardTitle>
                  <input value={this.state.searchPhrase} onChange={this.handleChange} placeholder='Search by name, surname, city and age'/>
                </Card>
              </Col>
            </Row>
            {/* <Row>
              <Col sm="12">
                <h4> </h4>
              </Col>
            </Row> */}
            <div>

            {this.state.users
              .map(user => ({
                ...user,
                searchData: (
                  user.name + user.surname + user.adress + user.age
                ).toLocaleLowerCase(),
              }))
              .filter(user =>
                user.searchData.includes(
                  this.state.searchPhrase.toLocaleLowerCase()
                )
              )
      .map(user => (
      <Card key={user.id}>
        <CardBody>
          <CardTitle>{user.name}</CardTitle>
          <CardSubtitle>{user.age}</CardSubtitle>
        </CardBody>
        <div style={{ textAlign: 'center'}}>
        <img src={user.photo + '&size=150x150'} alt='user'/>
        </div>
        <CardBody>
          <CardText>{user.adress}</CardText>
          <CardLink href="#">See Full Profile</CardLink>
          <CardLink href="#">Send a Message</CardLink>
        </CardBody>
      </Card>
  
  ))}
      </div>
          </TabPane>
          <TabPane tabId="2">
          <MyMap />
          </TabPane>
        </TabContent>
      </div>
      </div>
    )
  }
}

export default UserProfile
