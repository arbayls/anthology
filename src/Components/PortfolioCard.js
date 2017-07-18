import React, { Component } from 'react';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';

class PortfolioCard extends Component {

  render() {
    return (
      <div className="single-card portfolio-card">
        <div className="tag">
          <a href={this.props.article} className="embedly-card" data-card-theme="light" data-card-width="25%" data-card-height="auto" data-card-key="82db3e7ef863409080c2999dbf364c86"></a>
        </div>
      </div>
    )
  }
}

export default PortfolioCard;
