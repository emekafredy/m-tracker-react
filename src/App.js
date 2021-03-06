import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import WelcomeBody from './components/Layout/WelcomeBody';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Requests from './components/User/Requests';
import CreateRequest from './components/User/CreateRequest';
import SingleRequest from './components/User/SingleRequest';
import UpdateRequest from './components/User/UpdateRequest';
import PrivateRoute from './components/ProtectRoutes/PrivateRoute';
import NotFound from './components/ProtectRoutes/NotFound';

// redux store configuration
import configureStore from './store/configureStore';

// utility function to set token
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logUserOut } from './actions/auth';

// styling
import '../css/styles.css';

const store = configureStore();

// Check for authentication
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logUserOut());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route exact path='/' component={ WelcomeBody }/>
              <Route exact path='/register' component={ SignUp }/>
              <Route exact path='/login' component={ Login }/>
              <PrivateRoute exact path="/requests" component={ Requests } />
              <PrivateRoute exact path="/new" component={ CreateRequest } />
              <PrivateRoute exact path="/request/:requestId" component={ SingleRequest }/>
              <PrivateRoute exact path="/request/:requestId/edit" component={ UpdateRequest }/>
              <Route component={ NotFound } />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
