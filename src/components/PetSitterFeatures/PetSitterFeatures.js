import React, { Component } from 'react'

import { Link } from 'react-router-dom';

import './PetSitterFeatures.css'

class PetSitterFeatures extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="smallwrapper">
        <h3>What do you want to do?</h3>
          <input className="inputCheckbox" type="checkbox" /><p>Daily house sitting</p>
          <input className="inputCheckbox" type="checkbox" /><p>Overnight house sitting</p>
          <input className="inputCheckbox" type="checkbox" /><p>Custom hours schedule</p>
          <input className="inputCheckbox" type="checkbox" /><p>Feeding</p>
          <input className="inputCheckbox" type="checkbox" /><p>Walks</p>
          <input className="inputCheckbox" type="checkbox" /><p>Train, teach and tame</p>



        </div>
        <Link to={`/petsitter`}><button>Return</button></Link>
        <button>Submit</button>
      </div>

    )
  }
}

export default PetSitterFeatures
