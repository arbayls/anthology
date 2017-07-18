import React, { Component } from 'react';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';


class Navbar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="navbar">
        <div>
          <p className="anthology">Anthology</p>
        </div>
        <button type="button" name="logout" onClick={this.props.logout} className="logout">LOGOUT</button>
        <button type="button" name="portfolio" onClick={this.props.goToPortfolio}>MY PORTFOLIO</button>
        <button type="button" name="find" onClick={this.props.find}>FIND CONTENT</button>
      </div>
    )
  }

}

export default Navbar;
