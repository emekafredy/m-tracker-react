import React, { Component } from 'react';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// action
import { registerUser } from '../../actions/auth';

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/me/requests');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/me/requests');
    }
    if (nextProps.errors.errors) {
      this.setState({ errors: nextProps.errors.errors })
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    const { registerUser } = this.props;
    
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    registerUser(newUser);
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

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));