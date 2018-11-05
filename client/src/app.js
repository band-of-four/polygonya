import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import stateRoot from './reducers';
import Auth from './auth.js';
import History from './history.js';
import StoryView from './StoryView.js';

import { nextScreen } from './actions/screen.js';

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
    this.state = { screen: 'story' }
  }

  render() {
    switch (this.state.screen) {
      case 'story':
        return <StoryView />;
      case 'auth':
        return <Auth key="auth" onComplete={() => this.setState({ screen: 'story' })} />;
    }
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
);
