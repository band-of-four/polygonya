import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import stateRoot from './reducers';
import { nextScreen } from './actions/game.js';

import AuthView from './AuthView.js';
import GameView from './GameView.js';
import MobileGameView from './MobileGameView.js';

let store;

if (process.env.NODE_ENV === "production")
  store = createStore(stateRoot, applyMiddleware(ReduxThunk));
else {
  store = createStore(stateRoot, composeWithDevTools(applyMiddleware(ReduxThunk)));

  const devUrlScreen = new URL(window.location.href).searchParams.get('screen');
  devUrlScreen && store.dispatch(nextScreen(devUrlScreen));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 'game' }
  }

  isMobile() {
    return window.matchMedia("(max-width: 600px)").matches;
  }

  render() {
    console.log(this.isMobile());
    switch (this.state.screen) {
      case 'game':
        return this.isMobile() ?
          <MobileGameView onLogout={() => this.setState({ screen: 'auth' })} /> :
          <GameView onLogout={() => this.setState({ screen: 'auth' })} />;
      case 'auth':
        return <AuthView onComplete={() => this.setState({ screen: 'game' })} />;
    }
  }
}

render(<Provider store={store}><App /></Provider>, document.body);
