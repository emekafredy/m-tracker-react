import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WelcomeBody extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <header id="header">
          <div className="container">
            <h1>Maintenance Tracker App</h1>
            <h2>Get it Fixed</h2>
            {
              isAuthenticated ? 
              <Link to="/requests">
                <button className="btn-signup">View Requests</button>
              </Link> : 
              <Link to="/register">
                <button className="btn-signup">Get Started</button>
              </Link>
            }
          </div>
        </header>

        <section className="grid">
          <div className="container">
            <div className="box">
              <img src="https://res.cloudinary.com/dgbmeqmyf/image/upload/v1527780365/rapid.png" />
              <h3>Rapid Response</h3>
              <p>Get your repairs and maintenance request processed on time</p>
            </div>
            <div className="box">
              <img src="https://res.cloudinary.com/dgbmeqmyf/image/upload/v1527769487/expertise.jpg" />
              <h3>Expertise</h3>
              <p>No cause to worry about things going wrong, because we have the best hands</p>
            </div>
            <div className="box">
              <img src="https://res.cloudinary.com/dgbmeqmyf/image/upload/v1527780136/multit.png" />
              <h3>Multi-requests</h3>
              <p>You can make as many requests as possible. We will attend to them all </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

WelcomeBody.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null )(withRouter(WelcomeBody));