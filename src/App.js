import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import WelcomeBody from './components/Layout/WelcomeBody';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Requests from './components/User/Requests';
import CreateRequest from './components/User/CreateRequest';

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
            <Route exact path='/' component={ WelcomeBody }/>
            <Route path='/register' component={ SignUp }/>
            <Route path='/login' component={ Login }/>
            <Route path="/requests" component={ Requests } />
            <Route path="/request/new" component={ CreateRequest } />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
