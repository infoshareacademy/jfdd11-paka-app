import React, { Component } from 'react'

import './PetOwnerPage.css'

class PetOwnerPage extends Component {
  render() {
    return (
      <div className="PetOwnerPage"><p>PetOwnerPagee</p>
        <form>
          <div className="inputWraper">
            <div className="inputSmallWraper">
              <input className="inputSmall" type="text" placeholder="Name" name="name"/>
              <input className="inputSmall" type="text" placeholder="Age"name="age"/>
              <input className="inputSmall" type="text" placeholder="Sex"name="sex"/>
              <input className="inputSmall" type="text" placeholder="Breed"name="breed"/>
            </div>
            <input type="image" className="photoInput"/>
          </div>
          <p>Short description:</p>
          <textarea rows= "4" cols="50"></textarea>
        </form>
      </div>
    )
  }
}

export default PetOwnerPage
