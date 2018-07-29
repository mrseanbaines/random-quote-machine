import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      quote: '',
      author: ''
    };

    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentWillMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data => this.setState({ data }, this.getRandomQuote(data)))
  }

  getRandomQuote(data) {
    const { quotes } = data;
    const randomIndex = Math.floor(Math.random() * quotes.length);

    this.setState({
      quote: quotes[randomIndex].quote,
      author: quotes[randomIndex].author
    });
  }

  render() {
    const { data, quote, author } = this.state;

    return (
      <div className="wrapper">
        <h1 className="text-center">Random Quote Machine</h1>
        <div id="quote-box" className="push-top">
          <div id="text">{quote}</div>
          <div id="author">- {author}</div>
          <ul className="buttons hoz">
            <li>
              <button
                className="btn"
                id="new-quote"
                onClick={() => this.getRandomQuote(data)}
              >
                New quote
              </button>
            </li>
            <li>
              <a
                className="twitter"
                id="tweet-quote"
                href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center push-top">
          by <a href="https://seanbaines.com" target="_blank" rel="noopener noreferrer">Sean Baines</a>
        </div>
      </div>
    );
  }
}

export default App;
