import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import firebase from 'firebase'

import './PetSitter.css'



class PetSitter extends Component {

  state= {
   name: [],
   age: [],
   adress: [],
   

  }

  render() {
    return (
      <div className="PetSitter"><p>PetSitter</p>
        <form>
          <div className="inputWraper">
            <div className="inputSmallWraper">
              <input className="inputSmall" type="text" placeholder="Name" name="name"/>
              <input className="inputSmall" type="text" placeholder="Age"name="age"/>
              <input className="inputSmall" type="text" placeholder="Adress"name="adress"/>
              
              
            </div>
            <input type="image" alt="Your Pic" className="photoInput"/>
          </div>
          <p>Short description of you:</p>
          <textarea rows= "4" ></textarea>
          <Link to={`/petsitter/petsitterfeatures`}><button>Next</button></Link>
          
        </form>
        </div>
    )
  }
}

export default PetSitter
