import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GAME_CUTSCENE, GAME_DIALOGUE } from './script.js';
import { nextState } from './actions/game.js';

class Story extends Component {
  advanceCutscene = () =>
    this.props.dispatchNextState(this.props.screen.next);

  advanceDialogue = (nextState) => () =>
    this.props.dispatchNextState(nextState);

  render() {
    switch (this.props.screen.type) {
      case GAME_CUTSCENE:
        return (
          <div className="cutscene">
            <p className="cutscene__content">{this.props.screen.text}</p>
            <a className="cutscene__action" onClick={this.advanceCutscene}>Продолжить</a>
          </div>
        );
      case GAME_DIALOGUE:
        return (
          <div className="grid">
            <header key="header" className="grid__header header">
              <a className="header__link" key="homeLink" href="#">Polygonya</a>
              <a className="header__link" key="aboutLink" href="#">?</a>
            </header>
            <section key="sprite" className="grid__sprite sprite" style={{ backgroundImage: `url(/assets/${this.props.screen.sprite})` }} />
            <section key="textbox" className="grid__textbox">
              <div key="quote" className="quote">
                <span key="quoteSpeaker" className="quote__speaker">Каики Ахиру</span>
                <p key="quoteContent" className="quote__content">{this.props.screen.text}</p>
              </div>
            </section>
            <section key="controls" className="grid__controls controls">
              {this.props.screen.choices.map(({ text, next }) => (
                <a className="controls__action" onClick={this.advanceDialogue(next)}>{text}</a>
              ))}
            </section>
          </div>
        );
    }
  }
}

const mapStateToProps = (state) => ({ screen: state.game });

const mapDispatchToProps = (dispatch) => ({
  dispatchNextState: (nextId) => dispatch(nextState(nextId))
});

const StoryView = connect(mapStateToProps, mapDispatchToProps)(Story)

export default StoryView;
