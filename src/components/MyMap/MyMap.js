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

  render() {
    console.log(this.props)
    // console.log(this.props.users)

    // const position1 = this.props.users.filter(user => user.positionx)
    // const position2 = this.props.users.filter(user => user.positiony)
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
          <Marker key={user.id} position={[user.positionx, user.positiony]}>
            <Popup>
            <img src={user.photo + "&size=20x20"} alt="user" /> {user.name} <br /> {user.adress}
            </Popup>
          </Marker>
        )}
      </Map>
    );
  }
}

export default MyMap;
