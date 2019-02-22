import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './MainMenu.css';

class MainMenu extends Component {
  render() {
    return (
      <div className="MainMenu">
        <h2>Main menu</h2>
        <ul>
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
       
          
        </ul>
      </div>
    );
  }
}

export default MainMenu;