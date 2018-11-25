import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typewriter from './Typewriter.js';

export default class GameDialogueMobile extends Component {
  constructor(props) {
    super(props);
    this.state = { textTyped: false, showChoices: false, showMenu: false };
  }

  onTextboxClick = () => {
    if (this.state.textTyped) this.setState({ showChoices: true });
    else this.refs.typewriter.finishTyping()
  };

  render() {
    if (this.state.showMenu) return this.renderMenu();
    if (this.state.showChoices) return this.renderChoices();
    return this.renderSprite();
  }

  renderMenu() {
    return (
      <div className="mobile-menu neutral-bg">
        <p className="mobile-menu__name">{this.props.playerName}</p>
        <p className="mobile-menu__day">День #{this.props.day}</p>

        <a className="mobile-menu__link" key="close" onClick={() => this.setState({ showMenu: false })}>вернуться в игру</a>
        <a className="mobile-menu__link" key="memories" onClick={this.props.onHistory}>воспоминания</a>
        <a className="mobile-menu__link" key="logout" onClick={this.props.onLogout}>выйти</a>
      </div>
    );
  }

  renderSprite() {
    return (
      <div className="fade-in">
        <header key="menu" className="mobile-menu-toggle button"
          onClick={() => this.setState({ showMenu: true })}>...</header>
        <section key="sprite" className="mobile-sprite"
          style={{ backgroundImage: `url(${this.props.screen.sprite})` }} />
        <section key="textbox-container" className="mobile-textbox-container" onClick={this.onTextboxClick}>
          <div className="textbox textbox--mobile">
            <span key="textboxName" className="textbox__name">Каики Ахиру</span>
            <p key="textboxText" className="textbox__text textbox__text--mobile">
              <Typewriter ref="typewriter" initDelay={600}
                text={this.props.screen.text} key={this.props.screen.text}
                onTypingEnd={() => this.setState({ textTyped: true })} />
            </p>
            <div key="textboxBlinker" className="textbox__blinker">
              {this.state.textTyped ? 'продолжить...' : <span>&nbsp;</span>}
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderChoices() {
    return (
      <div className={`mobile-fullscreen-controls neutral-bg ${this.props.screenClass}`}>
        <section className="mobile-textbox-container">
          <div className="textbox textbox--mobile">
            <span key="textboxName" className="textbox__name">Каики Ахиру</span>
            <p key="textboxText" className="textbox__text textbox__text--mobile">
              {this.props.screen.text}
            </p>
            <div key="textboxBlinker" />
          </div>
        </section>
        <section className="js-controls js-controls--shown">
          {this.props.screen.choices.map(([ text, next ], i) => (
            <a className="button button--dialogue-choice" key={i}
              onClick={() => this.props.onNextScreen(next)}>{text}</a>
          ))}
        </section>
      </div>
    );
  }
}
