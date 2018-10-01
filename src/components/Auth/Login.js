import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className="signUp">
        <form> 
          <div className="centre-div">
            <h1> Login Here </h1>
          </div>
            <input className="input-class" type="email" id="email" required placeholder="Email" />

            <input className="input-class" type="password" id="password" required placeholder="Password" />

            <input type="submit" value="Login"/> 

        </form>
        <div className="centre-div">
          <p>Don't have an account ?</p>
          <a href="sign-up.html"> Sign up </a>
        </div>
      </div>
    )
  }
}

export default Login;
