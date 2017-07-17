import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {test: localStorage.getItem('test')}
  }
  render() {
    return (
      <div className="login">
        <form className="userInfo">
          <input id="username" type="text" name="username" placeholder="username" ref="username"></input>
          <input id="password" type="password" name="password" placeholder="password" ref="password"></input>
          <button id="submitLogin" type="button" name="Submit" onClick={login.bind(this)}>Log In</button>
          <button id="submitSignup" type="button" name="Submit" onClick={signup.bind(this)}>Sign Up</button>
        </form>
      </div>
    );
  }
}

function login() {
  console.log("TEST");
}

function signup() {
  console.log("ANTOERHOKEJS TEST");
}

export default Login;
