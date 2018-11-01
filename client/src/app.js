import React, { Component } from 'react';
import { render } from 'react-dom';

import GraphForm from './graph-form.js';
import History from './history.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 'graph' }
  }

  renderScreen = () => {
    switch (this.state.screen) {
      case "graph":
        return <GraphForm key="graph" showHistory={() => this.setState({ screen: 'history' })} />;
      case "history":
        return <History key="history" showGraph={() => this.setState({ screen: 'graph' })} />;
    }
  }

  render() {
    return (
      <div className="grid">
        <header key="header" className="grid__header header">
          <a className="header__link" key="homeLink" href="#">Polygonya</a>
          <a className="header__link" key="aboutLink" href="#">?</a>
        </header>
        <aside key="sprite" className="grid__sprite sprite" style={{backgroundImage: `url('/assets/${this.props.sprite}')`}} />
        <main key="main" className="grid__main">
          <div key="quote" className="quote">
            <span key="quoteSpeaker" className="quote__speaker">Каики Ахиру</span>
            <p key="quoteContent" className="quote__content">...</p>
          </div>
          {this.renderScreen()}
        </main>
      </div>
    );
  }
}

render(
    <App sprite="kaiki-chan-idle..png"/>
  document.body
);
