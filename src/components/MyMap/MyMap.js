import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import USerProfile from '../UserProfile'

import "./MyMap.css";

class MyMap extends Component {
  state = {
    lat: 54.424,
    lng: 18.5956,
    zoom: 13
  };
  
centerMap = (x, y) => {
  console.log(x, y)
  this.setState({
    lat: x,
    lng: y
  })
}

  render() {
    console.log(this.props)
  
    return (
      <Map
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
        style={{ width: "90vw", height: 400 }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.users.map((user) => 
          <Marker key={user.id} position={[user.positionx, user.positiony]} onClick={() => this.centerMap(user.positionx, user.positiony)}>
            <Popup>
            <img src={user.photo + "&size=10x20"} alt="user" /> {user.name} <br /> {user.adress}
            </Popup>
          </Marker>
        )}
      </Map>
    );
  }
}

export default MyMap;
