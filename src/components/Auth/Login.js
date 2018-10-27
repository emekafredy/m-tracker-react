import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';

const API = 'http://emeka-m-tracker.herokuapp.com';

class Login extends Component {
  constructor() {
    super();
    this.state = {
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
    
    const registeredUser = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post(`${API}/api/v1/auth/login`, registeredUser)
      .then(response => console.log(response.data))
      .catch(error => this.setState({ errors: error.response.data.errors }))
  }

  render() {
    const errors = this.state;
    return (
      <div className="signUp">
        <div className="card">
          <form className="auth-form" onSubmit={ this.handleSubmit }> 
            <div className="centre-div">
              <h1> Login Here </h1>
            </div>
            <input
              className={classnames('input-class', {
                'error-outline': errors.email
              })}
              type="text" placeholder="Email" name="email"
              value={ this.state.email }
              onChange={ this.handleChange }
            />
            { errors.errors.email ? (<div className="error-message">{ errors.errors.email }</div>) : '' }

            <input
              className={classnames('input-class', {
                'error-outline': errors.password
              })}
              type="password" placeholder="Password" name="password"
              value={ this.state.password }
              onChange={ this.handleChange }
            />
            { errors.errors.password ? (<div className="error-message">{ errors.errors.password }</div>) : '' }

            <input type="submit" value="Login"/> 

          </form>
          <div className="centre-div">
            <p>Don't have an account ?</p>
            <Link className="links" to="/register"> Sign up </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
