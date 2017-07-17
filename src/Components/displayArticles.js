import React, { Component } from 'react';
import ArticleCard from './articleCard'

class DisplayArticles extends Component {
  render () {
    let articles;

    if (this.props.articles) {
      articles = this.props.articles.reduce((accu, curr) => {return accu.concat(curr)});
      articles = articles.map((article, idx) => {
        return (
          <ArticleCard key={idx} article={article} />
        );
      });
    }

    return (
      <div id="results"> {articles} </div>
    )
  }
}

export default DisplayArticles;
