import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GAME_CUTSCENE, GAME_DIALOGUE, GAME_TEST } from './script.js';
import { nextState } from './actions/game.js';
import GraphView from './GraphView.js';

class Story extends Component {
  advanceCutscene = () =>
    this.props.dispatchNextState(this.props.screen.next);

  advanceDialogue = (nextState) => () =>
    this.props.dispatchNextState(nextState);

  renderGrid = (gridClass, controls) => (
    <div className={`grid ${gridClass}`}>
      <header key="header" className="grid__header header">
        <a className="header__link" key="homeLink" href="#">Polygonya</a>
        <a className="header__link" key="aboutLink" href="#">?</a>
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
      case GAME_CUTSCENE:
        return (
          <div className="cutscene">
            <p className="cutscene__content">{this.props.screen.text}</p>
            <a className="cutscene__action" onClick={this.advanceCutscene}>Продолжить</a>
          </div>
        );
      case GAME_TEST:
        return this.renderGrid("grid--graph",
          <GraphView key="graph" fieldsClass="grid__fields" graphClass="grid__graph" />
        );
      case GAME_DIALOGUE:
        return this.renderGrid("grid--dialogue",
          <section key="controls" className="grid__controls">
            {this.props.screen.choices.map(({ text, next }, i) => (
              <a className="button" key={i} onClick={this.advanceDialogue(next)}>{text}</a>
            ))}
          </section>);
    }
  }
}

const mapStateToProps = (state) => ({ screen: state.game });

const mapDispatchToProps = (dispatch) => ({
  dispatchNextState: (nextId) => dispatch(nextState(nextId))
});

const StoryView = connect(mapStateToProps, mapDispatchToProps)(Story)

export default StoryView;
