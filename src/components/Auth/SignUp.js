import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  render() {
    return (
      <div className="signUp">
        <form id="registerUsers" onSubmit={ this.handleSubmit }> 
          
        </form>
        <div className="centre-div">
          <p>Already Registered ?</p>
          <Link to="/login"> Login </Link>
        </div>
      </div>
    )
  }
}

export default SignUp;
