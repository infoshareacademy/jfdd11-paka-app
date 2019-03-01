import React, { Component } from 'react'
import firebase from 'firebase'
import { Card, CardBody, CardLink,CardSubtitle ,TabContent, TabPane, Nav, NavItem, NavLink, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import MyMap from '../MyMap'

import './UserProfile.css'

class UserProfile extends Component {
  state = {
    users: [],
    activeTab: '1'
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
      <div className="UserProfile">
   <div>
   <h1>Check out fellow users</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Browse dogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
            See dogs near you
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4></h4>
              </Col>
            </Row>
            <div>
      {this.state.users.map(user => (
      <Card key={user.id}>
        <CardBody>
          <CardTitle>{user.first_name}</CardTitle>
          <CardSubtitle>{user.breed}</CardSubtitle>
        </CardBody>
        <div style={{ textAlign: 'center'}}>
        <img src={user.avatar + '&size=150x150'} alt='user'/>
        </div>
        <CardBody>
          <CardText>{user.city}</CardText>
          <CardLink href="#">See Full Profile</CardLink>
          <CardLink href="#">Send a Message</CardLink>
        </CardBody>
      </Card>
  
  ))}
      </div>
          </TabPane>
          <TabPane tabId="2">
          <MyMap users ={this.state.users} />
            {/* <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row> */}
          </TabPane>
        </TabContent>
      </div>
      </div>
    )
  }
}

export default UserProfile
