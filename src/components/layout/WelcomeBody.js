import React, { Component } from 'react'

class WelcomeBody extends Component {
  render() {
    return (
      <div>
        <header id="header">
          <div className="container">
            <h1>Maintenance Tracker App</h1>
            <h2>Get it Fixed</h2>
            <button className="btn-signup">Get Started</button>
          </div>
        </header>

        <section className="grid">
          <div className="container">
            <div className="box">
              <img src="http://res.cloudinary.com/dgbmeqmyf/image/upload/v1527780365/rapid.png" />
              <h3>Rapid Response</h3>
              <p>Get your repairs and maintenance request processed on time</p>
            </div>
            <div className="box">
              <img src="http://res.cloudinary.com/dgbmeqmyf/image/upload/v1527769487/expertise.jpg" />
              <h3>Expertise</h3>
              <p>No cause to worry about things going wrong, because we have the best hands</p>
            </div>
            <div className="box">
              <img src="http://res.cloudinary.com/dgbmeqmyf/image/upload/v1527780136/multit.png" />
              <h3>Multi-requests</h3>
              <p>You can make as many requests as possible. We will attend to them all </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default  WelcomeBody;
