import React, { Component } from 'react';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// action
import { loginUser } from '../../actions/auth';

export class Login extends Component {
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/requests');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/requests');
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
    
    const { loginUser } = this.props;

    const registeredUser = {
      email: this.state.email,
      password: this.state.password
    }

    loginUser(registeredUser);
  }

  render() {
    const errors = this.state;
    return (
      <div className="signUp">
        <div className="card">
          <form className="auth-form" onSubmit={ this.handleSubmit }> 
            <div className="centre-div">
              <h1> Login </h1>
            </div>
            <input
              className={classnames('input-class', {
                'error-outline': errors.email
              })}
              id="email"
              type="text" placeholder="Email" name="email"
              value={ this.state.email }
              onChange={ this.handleChange }
            />
            { errors.errors.email ? (<div className="error-message">{ errors.errors.email }</div>) : '' }

            <input
              className={classnames('input-class', {
                'error-outline': errors.password
              })}
              id="password"
              type="password" placeholder="Password" name="password"
              value={ this.state.password }
              onChange={ this.handleChange }
            />
            { errors.errors.password ? (<div className="error-message">{ errors.errors.password }</div>) : '' }

            <input type="submit" value="Login" id="submit"/> 

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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));