import React, { Component } from 'react'

import './PetOwner.css'

class PetOwner extends Component {

  state = {
    name: '',
    surname: '',
    age: '',
    sex: '',
    breed: ''

  }

  handleChange = event => {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.setState({
      [fieldName]: value,
    });
  };



  render() {
    return (
      <div className="PetOwnerPage"><p>PetOwnerPagee</p>
        <form>
          <div className="inputWraper">
            <div className="inputSmallWraper">
              <input value={this.state.name} className="inputSmall"   type="text"   placeholder="Name"    name="name"    onChange={this.handleChange}/>
              <input value={this.state.surname} className="inputSmall" type="text"  placeholder="Surname" name="surname" onChange={this.handleChange}/>
              <input value={this.state.age}   className="inputSmall"  type="number"   placeholder="Age"     name="age"     onChange={this.handleChange}/>
              <input value={this.state.sex}   className="inputSmall"  type="text"   placeholder="Sex"     name="sex"     onChange={this.handleChange}/>
              <input value={this.state.breed} className="inputSmall"  type="text"   placeholder="Breed"   name="breed"   onChange={this.handleChange}/>
            </div>
            <input type="image" alt="Your dog's picture" className="photoInput"/>
          </div>
          <p>Short description of your dog:</p>
          <textarea rows= "4" ></textarea>
          <button className="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default PetOwner
