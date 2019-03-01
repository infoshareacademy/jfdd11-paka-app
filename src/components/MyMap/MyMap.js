import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import './MyMap.css'

const markers = [[54.4047, 18.5319], [54.4240, 18.5956], [54.4416, 18.5601]];

class MyMap extends Component {

  state = {
      lat: 54.35205,
      lng: 18.64637,
      zoom: 13
    }
   

  render() {

    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        style={{ width: 500, height: 400 }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default MyMap;