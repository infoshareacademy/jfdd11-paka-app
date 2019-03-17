import React, { Component } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";



import "./FormMap.css";

class FormMap extends Component {
  state = {
   
    zoom: 13,
    users: null
  };


  centerMap = (x, y) => {
    this.setState({
      lat: x,
      lng: y
    });
  };


   handleMapClick = (event) => {
    const coords = event && event.latlng  
    
    this.props.onClick(coords)
  }

  render() {
   const { lat = 54.4047, lng = 18.5319 } = this.props

    return (
      <Map
        center={[lat, lng]}
        zoom={this.state.zoom}
        style={{ width: "90vw", height: "50vh" }}
        onClick={this.handleMapClick}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
          <Marker
            //key={user.id}
            position={[lat, lng]} 
          />
      
      </Map>
    );
  }
}

export default FormMap;
