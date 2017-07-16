import React, { Component } from 'react';
import ArticleCard from './articleCard'

class DisplayArticles extends Component {
  render () {
    let articles;

    if (this.props.articles) {
      console.log(this.props.articles);
      articles = this.props.articles.reduce((accu, curr) => {return accu.concat(curr)});
      console.log(articles);
      articles = articles.map((article, idx) => {
        return (
          <ArticleCard key={idx} article={article} />
        );
      });
      console.log(articles);
    }

    return (
      <div id="results"> {articles} </div>
    )
  }
}

export default DisplayArticles;
