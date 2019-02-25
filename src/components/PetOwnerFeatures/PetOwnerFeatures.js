import React, { Component } from 'react'

import './PetOwnerFeatures.css'

class PetOwnerFeatures extends Component {
  render() {
    return (
      <div className="PetOwnerFeatures">PetOwnerFeatures
        <form>
          
            <ul className="checkboxSmallWraper">
              <li><input className="inputCheckbox" type="checkbox" name="dog-walking"/>Dog walking schedule: fit your schedule walks to</li>
              <li><input className="inputCheckbox" type="checkbox" name="day-care"/>Doggy day-care: daytime care in your sitter's dog friendly home.</li>
              <li><input className="inputCheckbox" type="checkbox" name="day-night-care"/>Daily or overnight house sitting: perfect for your long working hours.</li>
              <li><input className="inputCheckbox" type="checkbox" name="drop-in"/>Drop-in visit's: for whenever u need a check-in or a play date</li>
            </ul>
        
          <button className="submit">Submit</button>
        </form>
      
      
      
      </div>
    )
  }
}

export default PetOwnerFeatures
