import React, { Component } from 'react';

import Navbar from './layout/Navbar';
import WelcomeBody from './layout/WelcomeBody';
import Footer from './layout/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <WelcomeBody />
        <Footer />
      </div>
    )
  }
}

export default App;
