import React, { Component } from 'react';

import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import AppRoutes from './AppRoutes';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    )
  }
}

export default App;
