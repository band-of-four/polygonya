import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import stateRoot from './reducers';
import { nextScreen } from './actions/game.js';
import { history, loadPlayerState, erasePlayerState } from './actions/app.js';
import { APP_UI_AWAIT, APP_UI_AUTH, APP_UI_FETCH_ERROR, APP_UI_GAME, APP_UI_HISTORY } from './reducers/app.js';

import AuthView from './AuthView.js';
import GameView from './GameView.js';
import HistoryView from './HistoryView.js';

let store;

screen && screen.orientation && screen.orientation.lock("portrait-primary");

if (process.env.NODE_ENV === "production") {
  store = createStore(stateRoot, applyMiddleware(ReduxThunk));
  store.dispatch(loadPlayerState());
}
else {
  store = createStore(stateRoot, composeWithDevTools(applyMiddleware(ReduxThunk)));
  store.dispatch(loadPlayerState()).then(() => {
    const devUrlScreen = new URL(window.location.href).searchParams.get('screen');
    devUrlScreen && store.dispatch(nextScreen(devUrlScreen));
  });
}

class App extends Component {
  render() {
    switch (this.props.screen) {
      case APP_UI_AUTH:
        return <AuthView />;
      case APP_UI_HISTORY:
        return <HistoryView />;
      case APP_UI_GAME:
        return <GameView onLogout={() => this.props.dispatchLogout()} onHistory={() => this.props.dispatchHistory()} />;
      case APP_UI_AWAIT:
        return (
          <section className="info-page neutral-bg">
            <div className="spinner">
              {Array(4).fill().map((_, i) => <div className="spinner__line" key={i} />)}
            </div>
          </section>
        );
      case APP_UI_FETCH_ERROR:
        return (
          <section className="info-page neutral-bg">
            <p>В Сети что-то не так...</p>
            <p>Проверь свое подключение к Интернету и обнови страницу.</p>
          </section>
        );
    }
  }
}

const mapStateToProps = ({ app: { ui }}) => ({ screen: ui });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogout: () => dispatch(logout()),
  dispatchHistory: () => dispatch(history())
});

const AppView = connect(mapStateToProps, mapDispatchToProps)(App)

render(<Provider store={store}><AppView /></Provider>, document.body);
