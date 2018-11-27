import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createPlayer } from './actions/app.js';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  createPlayer = (e) => {
    e.preventDefault();
    this.state.name !== '' && this.props.dispatchCreatePlayer(this.state.name);
  }

  render() {
    return (
      <form className="info-page form form--full-screen neutral-bg" onSubmit={this.createPlayer}>
        <input type="text" className="field" placeholder="Твое имя"
          value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
        <button type="submit" className="button">Познакомиться</button>
        <p className="form__narrow-p">
          Твой игровой прогресс будет сохранен на этом устройстве.
        </p>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCreatePlayer: (name) => dispatch(createPlayer(name))
});

const AuthView = connect(() => ({}), mapDispatchToProps)(Auth)

export default AuthView;
