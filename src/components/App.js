import React, { Component } from 'react';

import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Paths from './Paths';
import './styles/layout.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Paths />
        <Footer />
      </div>
    )
  }
}

export default App;
