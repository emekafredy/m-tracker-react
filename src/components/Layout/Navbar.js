import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logUserOut } from '../../actions/auth';

class Navbar extends Component {

  onLogoutClick(event) {
    event.preventDefault();

    const { logUserOut, history } = this.props;

    logUserOut();
    history.push('/');
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authMenu = (
      <div className="nav-links">
        <Link to="request/new">
          <i className="fa fa-plus"></i> Create new request
        </Link>
        <Link to="/" onClick={ this.onLogoutClick.bind(this) }
          className="auth-links">
          Logout
        </Link>
        <Link to=""> 
          <span className="role">
            <i className="fa fa-user-circle-o"></i> { isAuthenticated ? user.user.firstname : ''}
          </span>
        </Link>
      </div> 
    );

    const menu = (
      <div className="nav-links">
        <Link to="/register" className="auth-links">Sign Up</Link>
        <Link to="/login" className="auth-links">Login</Link>
      </div> 
    );

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
        { isAuthenticated ? authMenu : menu }   
      </div>
    );
  }
}

Navbar.propTypes = {
  logUserOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logUserOut })(withRouter(Navbar));