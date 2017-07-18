import React, { Component } from 'react';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';
import PortfolioCard from './PortfolioCard';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {articles: null}
  }

  componentDidMount() {
    var self = this;
    axios.get(`http://localhost:3000/portfolio/articles/${localStorage.getItem('user')}`).then(function(data) {
      var articles = data.data.rows;
      self.setState({articles: articles})
    })
  }
  render() {
    if (this.state.articles) {
      let articles = this.state.articles.map(article => {
        console.log(article);
        return (
          <PortfolioCard key={article.id} article={article.url} />
        )
      })
      return (
        <div className="portfolio">
          {articles}
        </div>
      );
    } else {
      return (
        <div>Loading ...</div>
      )
    }
  }
}

export default Portfolio;
