import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import stateRoot from './reducers';
import Auth from './auth.js';
import GraphForm from './graph-form.js';
import History from './history.js';

const store = createStore(stateRoot, applyMiddleware(ReduxThunk));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 'auth' }
  }

  renderScreen = () => {
    switch (this.state.screen) {
      case 'auth':
        return <Auth key="auth" />;
      case 'graph':
        return <GraphForm key="graph" showHistory={() => this.setState({ screen: 'history' })} />;
      case 'history':
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
  <Provider store={store}>
    <App sprite="kaiki-chan-idle.png"/>
  </Provider>,
  document.body
);
