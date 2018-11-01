import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class PrivateRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    const { component: ProtectedComponent, auth: { isAuthenticated }, ...rest } = this.props
    return (
      <Route
        {...rest}

        render={props => (
          isAuthenticated
            ? <ProtectedComponent {...props} />
            : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }}
              />
            )
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute);
