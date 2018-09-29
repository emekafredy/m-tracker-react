import React, { Component } from 'react';
import './layout.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div id="brand">
          <span><a href="index.html">M-Tracker</a></span>
        </div>
        <div className="nav-icon">

        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
        </div>

        <input type="checkbox" id="nav-check"/>
        <div className="nav-links">
          <a href="sign-up.html">Sign Up</a>
          <a href="login.html">Login</a>
        </div>   
      </div>
    );
  }
}

export default Navbar;
