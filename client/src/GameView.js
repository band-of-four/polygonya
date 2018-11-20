import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SCRIPT_CUTSCENE, SCRIPT_DIALOGUE, SCRIPT_GRAPH } from './script.js';
import { nextScreen } from './actions/game.js';
import GraphView from './GraphView.js';

class Game extends Component {
  constructor(props) {
    super(props);
    /* Used for transitioning between cutscenes and dialogue */
    this.state = { transitionFrom: null, transitionTo: null, transitioning: false };
  }

  renderGrid = (gridClass, screen, controls) => (
    <div className={`grid ${gridClass}`}>
      <header key="header" className="grid__header header">
        <span className="header__info">{this.props.name}, день #{this.props.day}</span>
        <span>
          <a className="header__link" key="memoriesLink" onClick={this.props.onHistory}>воспоминания</a>
          <a className="header__link" key="logOutLink" onClick={this.props.onLogout}>выйти</a>
        </span>
      </header>
      <section key="sprite" className="grid__sprite sprite"
               style={{ backgroundImage: `url(${screen.sprite})` }} />
      <section key="textbox-container" className="grid__textbox">
        <div className="textbox">
          <span key="textboxName" className="textbox__name">Каики Ахиру</span>
          <p key="textboxText" className="textbox__text">{screen.text}</p>
        </div>
      </section>
      {controls}
    </div>
  );

  renderScreen(screen) {
    switch (screen.type) {
      case SCRIPT_CUTSCENE:
        const choices = screen.choices || [['Продолжить', screen.next]];
        const controls = choices.map(([ text, next ], i) =>
          <a className="button button--inline" key={i}
             onClick={() => this.props.dispatchNextScreen(next)}>{text}</a>
        );
        const image = screen.sprite ? (
          <section className="cutscene__image"><img src={screen.sprite} /></section>
        ) : null;
        return (
          <div className="cutscene">
            <p className="cutscene__content">{screen.text}</p>
            {image}
            <section className="cutscene__controls">{controls}</section>
          </div>
        );
      case SCRIPT_GRAPH:
        return this.renderGrid("grid--graph", screen,
          <GraphView key="graph" formClass="grid__fields" graphClass="grid__graph" />
        );
      case SCRIPT_DIALOGUE:
        return this.renderGrid("grid--dialogue", screen,
          <section key="controls" className="grid__controls">
            {screen.choices.map(([ text, next ], i) => (
              <a className="button button--dialogue-choice" key={i}
                 onClick={() => this.props.dispatchNextScreen(next)}>{text}</a>
            ))}
          </section>
        );
    }
  }

  render() {
    if (!this.state.transitionFrom)
      return this.renderScreen(this.props.screen);

    if (!this.state.transitioning) {
      const prevScreen = this.renderScreen(this.state.transitionFrom);
      return <><div className="transition-overlay" />{prevScreen}</>;
    }
    const screen = this.renderScreen(this.state.transitionTo);
    return <><div className="transition-overlay transition-overlay--opaque" />{screen}</>;
  }

  static getDerivedStateFromProps({ screen: transitionTo }, state) {
    if (!state.transitionTo || state.transitionTo.type === transitionTo.type)
      return { transitionTo };

    return { transitionFrom: state.transitionTo, transitionTo };
  }

  componentDidUpdate() {
    if (!this.state.transitionFrom) return;

    if (!this.state.transitioning) {
      document.querySelector(".transition-overlay").classList.add("transition-overlay--opaque");
      setTimeout(this.transitionStep.bind(this), 1100);
    }
    else {
      document.querySelector(".transition-overlay").classList.remove("transition-overlay--opaque");
      setTimeout(this.transitionStep.bind(this), 700);
    }
  }

  transitionStep() {
    if (!this.state.transitioning) this.setState({ transitioning: true });
    else this.setState({ transitionFrom: null, transitioning: false });
  }
}

const mapStateToProps = ({ screen, player: { day, name } }) => ({ screen, day, name });

const mapDispatchToProps = (dispatch) => ({
  dispatchNextScreen: (nextId) => dispatch(nextScreen(nextId))
});

const GameView = connect(mapStateToProps, mapDispatchToProps)(Game)

export default GameView;
