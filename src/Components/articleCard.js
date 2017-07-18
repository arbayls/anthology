import React, { Component } from 'react';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';

class ArticleCard extends Component {
  render () {
    return (
      <div className="single-card">
        <div className="tag">
          <a href={this.props.article} className="embedly-card" data-card-theme="dark" data-card-width="25%" data-card-height="auto" data-card-key="82db3e7ef863409080c2999dbf364c86"></a>
        </div>
        <div className="add">
          <button onClick={this.addToPortfolio.bind(this)} className="addButton">Add To Portfolio</button>
        </div>
      </div>
    )
  }

  addToPortfolio(e) {
    e.preventDefault();
    console.log(this.props.article);
    axios.post("http://localhost:3000/portfolio/articles/new", {url: this.props.article, username: localStorage.getItem('user')}).then(function(success) {
      console.log("SUCCEESSS", success);
    }).catch(function(err) {
      console.log("ERRRR", err);
    })
  }
}

export default ArticleCard;
