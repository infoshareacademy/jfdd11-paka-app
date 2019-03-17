import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import firebase from "firebase";
import { Link } from 'react-router-dom'

import "./MyMap.css";

class MyMap extends Component {
  state = {
    lat: 54.424,
    lng: 18.5956,
    zoom: 13,
    users: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser !== null) {
        firebase
          .database()
          .ref(`users`)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(users => {
            this.setState({
              users: Object.entries(users || {}).map(([id, value]) => ({
                id,
                ...value
              }))
            });
          });
      }
    });
  }

  centerMap = (x, y) => {
    this.setState({
      lat: x,
      lng: y
    });
  };

  render() {
    if (this.state.users === null) {
      return <p>Loading...</p>;
    }

    return (
      <Map
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
        style={{ width: "90vw", height: "90vh" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.users.map(user => (
          <Marker
            key={user.id}
            position={[user.positionx || "", user.positiony || ""]}
            onClick={() =>
              this.centerMap(user.positionx || "", user.positiony || "")
            }
          >
            <Popup>
            <Link to={`/users/${user.id}`}>
            
              <img src={user.photo} style={{ width: "100%" }} alt="user" />{" "}
              {user.name}, <br /> {user.adress}</Link>
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default MyMap;
