import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from './actions/auth.js';

class Auth extends Component {
  signIn = () => {
    const { username, password } = this.refs;
    this.props.dispatchSignIn(username.value, password.value)
      .then((ok) => ok && this.props.onComplete());
  }

  render() {
    return (
      <form className="view">
        <input type="text" className="view__field" placeholder="Твое имя" ref="username" />
        <input type="password" className="view__field" placeholder="Пароль" ref="password" />

        <button type="submit" className="view__button" onClick={this.signIn}>Представиться</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignIn: (username, password) =>
      dispatch(login(username, password))
  }
}

const AuthView = connect(() => ({}), mapDispatchToProps)(Auth)

export default AuthView;
