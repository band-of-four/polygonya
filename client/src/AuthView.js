import React, { Component } from 'react';
import { connect } from 'react-redux';

import { APP_AUTH_INVALID_CREDS, APP_AUTH_NAME_TAKEN } from './reducers/app.js';
import { resetAuthScreen, login, signUp } from './actions/app.js';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { form: 'sign-in' };
  }

  signIn = (e) => {
    e.preventDefault();
    const { username, password } = this.refs;
    this.props.dispatchLogin(username.value, password.value);
  }

  signUp = (e) => {
    e.preventDefault();
    const { username, password } = this.refs;
    this.props.dispatchSignUp(username.value, password.value);
  }

  showSignInForm = (e) => { this.setState({ form: 'sign-in' }); this.props.dispatchResetErrors(); }

  showSignUpForm = (e) => { this.setState({ form: 'sign-up' }); this.props.dispatchResetErrors(); }

  renderForm(action, actionText, altText, altAction, altActionText) {
    if (this.props.authError === APP_AUTH_INVALID_CREDS)
      altText = "Имя или пароль неверны, попробуй еще раз. Или, может, мы с тобой незнакомы?..";
    else if (this.props.authError === APP_AUTH_NAME_TAKEN)
      altText = "Такое имя я уже знаю... Ты уверен, что мы не знакомы?";

    return (
      <form className="form form--full-screen" onSubmit={action}>
        <input type="text" className="field" placeholder="Твое имя" ref="username" />
        <input type="password" className="field" placeholder="Пароль" ref="password" />
        <button type="submit" className="button">{actionText}</button>
        <p>{altText}</p>
        <button type="button" className="button" onClick={altAction}>{altActionText}</button>
      </form>
    );
  }

  render() {
    if (this.state.form === 'sign-in')
      return this.renderForm(this.signIn, "Представиться",
        "Или мы еще не знакомы?..", this.showSignUpForm, "Познакомиться");
    if (this.state.form === 'sign-up')
      return this.renderForm(this.signUp, "Познакомиться",
        "Или мы уже знакомы?..", this.showSignInForm, "Представиться");
  }
}

const mapStateToProps = ({ app: { authError }}) => ({ authError });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (username, password) => dispatch(login(username, password)),
  dispatchSignUp: (username, password) => dispatch(signUp(username, password)),
  dispatchResetErrors: () => dispatch(resetAuthScreen())
});

const AuthView = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthView;
