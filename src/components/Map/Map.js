import React, { Component } from 'react'

import './Map.css'

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'


class Map extends Component {

  state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }

 
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap center={position} zoom={this.state.zoom}> 
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
       )

  }
}

export default Map;