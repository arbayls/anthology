import React, { Component } from 'react';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';

class ArticleCard extends Component {
  render () {
    return (
      <a href={this.props.article} className="embedly-card" data-card-theme="dark" data-card-width="30%" data-card-height="auto" data-card-key="82db3e7ef863409080c2999dbf364c86"></a>
    )
  }
}

export default ArticleCard;
