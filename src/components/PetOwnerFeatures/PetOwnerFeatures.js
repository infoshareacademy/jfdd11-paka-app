import React, { Component } from 'react'

import './PetOwnerFeatures.css'

class PetOwnerFeatures extends Component {
  render() {
    return (
      <div className="PetOwnerFeatures">PetOwnerFeatures
        <form>
          <div className="inputWraper">
            <div className="inputSmallWraper">
              <input className="inputCheckbox" type="checkbox"  name="dog-walking"/><p>Dog walking schedule</p>
              <input className="inputCheckbox" type="checkbox" name="day-care"/>
              <input className="inputCheckbox" type="checkbox" name="day-night-care"/>
              <input className="inputCheckbox" type="checkbox" name="drop-in"/>
            </div>
            
          </div>
          
          <button className="submit">Submit</button>
        </form>
      
      
      
      </div>
    )
  }
}

export default PetOwnerFeatures
