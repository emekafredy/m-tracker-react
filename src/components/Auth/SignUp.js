import React, { Component } from 'react';

import '../styles/auth.css';

class SignUp extends Component {
  render() {
    return (
      <div className="signUp">
        <form id="registerUsers"> 
          <div className="centre-div">
            <h2> Sign up </h2>
            <p>Please fill out every field</p>
          </div>
            <input className="input-class" type="text" id="firstName" required placeholder="First name" />

            <input className="input-class" type="text" id="lastName" required placeholder="Last name" />

            <input className="input-class" type="email" id="email" required placeholder="Email" /> 

            <input className="input-class" type="password" id="password" required placeholder="Password" />

            <input type="submit" value="Register" id="register"/>
        </form>
        <div className="centre-div">
          <p>Already Registered ?</p>
          <a href="login.html">Login</a>
        </div>
      </div>
    )
  }
}

export default SignUp;
