import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SCRIPT_CUTSCENE, SCRIPT_DIALOGUE, SCRIPT_GRAPH } from './script.js';
import { nextScreen } from './actions/game.js';
import GraphView from './GraphView.js';

class Game extends Component {
  advanceCutscene = () =>
    this.props.dispatchNextScreen(this.props.screen.next);

  advanceDialogue = (nextScreen) => () =>
    this.props.dispatchNextScreen(nextScreen);

  renderGrid = (gridClass, controls) => (
    <div className={`grid ${gridClass}`}>
      <header key="header" className="grid__header header">
        <span className="header__info" href="#">
          {this.props.name}'s Polygonya — day {this.props.day}
        </span>
        <span>
          <a className="header__link" key="memoriesLink">memories</a>
          <a className="header__link" key="logOutLink" onClick={this.props.onLogout}>quit</a>
        </span>
      </header>
      <section key="sprite" className="grid__sprite sprite"
               style={{ backgroundImage: `url(/assets/${this.props.screen.sprite})` }} />
      <section key="textbox" className="grid__textbox">
        <div key="quote" className="quote">
          <span key="quoteSpeaker" className="quote__speaker">Каики Ахиру</span>
          <p key="quoteContent" className="quote__content">{this.props.screen.text}</p>
        </div>
      </section>
      {controls}
    </div>
  );

  render() {
    switch (this.props.screen.type) {
      case SCRIPT_CUTSCENE:
        return (
          <div className="cutscene">
            <p className="cutscene__content">{this.props.screen.text}</p>
            <a className="cutscene__action" onClick={this.advanceCutscene}>Продолжить</a>
          </div>
        );
      case SCRIPT_GRAPH:
        return this.renderGrid("grid--graph",
          <GraphView key="graph" fieldsClass="grid__fields" graphClass="grid__graph" />
        );
      case SCRIPT_DIALOGUE:
        return this.renderGrid("grid--dialogue",
          <section key="controls" className="grid__controls">
            {this.props.screen.choices.map(({ text, next }, i) => (
              <a className="button" key={i} onClick={this.advanceDialogue(next)}>{text}</a>
            ))}
          </section>
        );
    }
  }
}

const mapStateToProps = ({ screen, player: { day, name } }) => ({ screen, day, name });

const mapDispatchToProps = (dispatch) => ({
  dispatchNextScreen: (nextId) => dispatch(nextScreen(nextId))
});

const GameView = connect(mapStateToProps, mapDispatchToProps)(Game)

export default GameView;
