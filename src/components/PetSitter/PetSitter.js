import React, { Component } from 'react'

import './PetSitter.css'

import { Input } from 'reactstrap';



class PetSitter extends Component {

  state = {
    name: '',
    surname: '',
    age: '',
    adress: '',
    description: '',
    file: null
  }


  handleNameChange = (event) => {
    const { onNameChange } = this.props
    onNameChange && onNameChange(event.target.value)
  }

  handleSurnameChange = (event) => {
    const { onSurnameChange } = this.props
    onSurnameChange && onSurnameChange(event.target.value)
  }

  handleAgeChange = (event) => {
    const { onAgeChange } = this.props
    onAgeChange && onAgeChange(event.target.value)
  }

  handleAdressChange = (event) => {
    const { onAdressChange } = this.props
    onAdressChange && onAdressChange(event.target.value)
  }

  handleDescriptionChange = (event) => {
    const { onDescriptionChange } = this.props
    onDescriptionChange && onDescriptionChange(event.target.value)
  }

  handleFileSelected = (event) => {
    const { onFileSelected } = this.props
    onFileSelected && onFileSelected(event.target.files[0])
    this.setState({file :URL.createObjectURL( event.target.files[0])})
  }


  render() {
    const { file } = this.state
    return (
      <div className="PetSitter"><p>PetSitter</p>

        <div className="inputWraper">
          <div className="inputSmallWraper">
            <input
              className="inputSmall"
              type="text"
              placeholder="Name"
              name="name"
              onChange={this.handleNameChange}
            />

            <input
              className="inputSmall"
              type="text"
              placeholder="Surname"
              name="Surname"
              onChange={this.handleSurnameChange}
            />

            <input
              className="inputSmall"
              type="text"
              placeholder="Age"
              name="age"
              onChange={this.handleAgeChange}
            />

            <input
              className="inputSmall"
              type="text"
              placeholder="Address"
              name="adress"
              onChange={this.handleAdressChange}
            />

          </div>

          <div>
            {file && <img alt="avatar" src={file}/>}
            <Input type="file" name="file" id="exampleFile" onChange={this.handleFileSelected }/>
          </div>
        </div>
        <p>Additional information:</p>
        <textarea rows="4" onChange={this.handleDescriptionChange} ></textarea>

      </div>
    )
  }
}

export default PetSitter
