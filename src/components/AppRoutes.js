import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import WelcomeBody from './Layout/WelcomeBody';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';

class Paths extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ WelcomeBody }/>
          <Route exact path='/register' component={ SignUp }/>
          <Route exact path='/login' component={ Login }/>
        </Switch>
      </div>
    )
  }
}

export default Paths;
