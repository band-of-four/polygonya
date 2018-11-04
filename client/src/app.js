import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import stateRoot from './reducers';
import Auth from './auth.js';
import History from './history.js';

import StoryView from './story-view.js';

const store = createStore(stateRoot, applyMiddleware(ReduxThunk));

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
