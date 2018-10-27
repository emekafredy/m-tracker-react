import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const API = 'http://emeka-m-tracker.herokuapp.com';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    axios.post(`${API}/api/v1/auth/signup`, newUser)
      .then(response => console.log(response.data))
      .catch(error => this.setState({ errors: error.response.data.errors }))
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="signUp">
        <form className="auth-form" onSubmit={ this.handleSubmit }> 
          <div className="centre-div">
            <h2> Sign up </h2>
            <p>Please fill out every field</p>
          </div>
          <input 
            className={classnames('input-class', {
              'error-outline': errors.firstName
            })}
            type="text" placeholder="First name" name="firstName"
            value={ this.state.firstName }
            onChange={ this.handleChange }
          />
          { errors.firstName ? (<div className="error-message">{ errors.firstName }</div>) : '' }

          <input
          className={classnames('input-class', {
            'error-outline': errors.lastName
          })}
          type="text" placeholder="Last name" name="lastName"
          value={ this.state.lastName }
          onChange={ this.handleChange }
          />
          { errors.lastName ? (<div className="error-message">{ errors.lastName }</div>) : '' }
    
          <input
          className={classnames('input-class', {
            'error-outline': errors.email
          })}
          type="text" placeholder="Email" name="email"
          value={ this.state.email }
          onChange={ this.handleChange }
          />
          { errors.email ? (<div className="error-message">{ errors.email }</div>) : '' }

          <input
          className={classnames('input-class', {
            'error-outline': errors.password
          })}
          type="password" placeholder="Password" name="password"
          value={ this.state.password }
          onChange={ this.handleChange }
          />
          { errors.password ? (<div className="error-message">{ errors.password }</div>) : '' }

          <input type="submit" value="Register" id="register"/>
        </form>
        <div className="centre-div">
          <p>Already Registered ?</p>
          <Link className="links" to="/login"> Login </Link>
        </div>
      </div>
    )
  }
}

export default SignUp;
