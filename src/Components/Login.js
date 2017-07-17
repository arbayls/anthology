import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();

  }
  render() {
    return (
      <div className="login">
        <div className="login-container">
         <div className="logoWrapper"></div>
         <h4>Welcome to Anthology</h4>
          <form className="userInfo">
            <input id="username" type="text" name="username" placeholder="  Username" ref="username"></input>
            <input id="password" type="password" name="password" placeholder="  Password" ref="password"></input>
            <button id="submitLogin" type="button" name="Submit" onClick={login.bind(this)}>Log In</button>
            <button id="submitSignup" type="button" name="Submit" onClick={signup.bind(this)}>Sign Up</button>
          </form>
        </div>
        <div className="hero">
          <div className="heroText">
            <h1>SHOWCASE YOUR ABILITIES</h1>
            <h3 className="heroSubtitle">Create a portfolio quickly and easily.</h3>
          </div>
        </div>
      </div>
    );
  }
}

function login(e) {
  e.preventDefault();
  console.log("TEST");
  var self = this;
  axios.post("http://localhost:3000/users", {username: this.refs.username.value, password: this.refs.password.value}).then((loggedIn) => {
    if (loggedIn.data) {
      localStorage.setItem('user', self.refs.username.value)
      this.props.updater()
    }
  })
}

function signup(e) {
  e.preventDefault();
  console.log("ANTOERHOKEJS TEST");
  var self = this;
  axios.post("http://localhost:3000/users/new", {username: this.refs.username.value, password: this.refs.password.value}).then((loggedIn) => {
    if (loggedIn.data !== "Already Exists") {
      localStorage.setItem('user', self.refs.username.value)
      this.props.updater()
    }
  })
}

export default Login;
