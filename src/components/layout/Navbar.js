import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div id="brand">
          <span>
            <Link to="/">M-Tracker</Link>
          </span>
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
          <Link to="/register" className="auth-links">Sign Up</Link>
          <Link to="/login" className="auth-links">Login</Link>
        </div>   
      </div>
    );
  }
}

export default Navbar;
