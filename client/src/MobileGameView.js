import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SCRIPT_CUTSCENE, SCRIPT_DIALOGUE, SCRIPT_GRAPH } from './script.js';
import { nextScreen } from './actions/game.js';
import GraphView from './GraphView.js';

class MobileGame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  advanceCutscene = () =>
    this.props.dispatchNextScreen(this.props.screen.next);

  advanceDialogue = (nextScreen) => () => { 
    this.props.dispatchNextScreen(nextScreen);
    this.setState({ choicesFor: null });
  }

  openDialogueChoices = () =>
    this.setState({ choicesFor: this.props.screen });

  renderScreen(screen) {
    switch (screen.type) {
      case SCRIPT_CUTSCENE:
        return (
          <div className="cutscene">
            <p className="cutscene__content">{screen.text}</p>
            <a className="button button--inline" onClick={this.advanceCutscene}>Продолжить</a>
          </div>
        );
      case SCRIPT_GRAPH:
        return (
          <div class="mobile-grid">
            <header key="menu" className="mobile-menu-toggle button">...</header>
            <GraphView key="graph" formClass="mobile-grid__form" fieldsClass="mobile-graph-fields" graphClass="mobile-grid__graph" />
          </div>
        );
      case SCRIPT_DIALOGUE:
        return (
          <div>
            <header key="menu" className="mobile-menu-toggle button">...</header>
            <section key="sprite" className="mobile-sprite"
                     style={{ backgroundImage: `url(/assets/${screen.sprite})` }} />
            <section key="textbox-container" className="mobile-controls">
              <div className="textbox textbox--mobile" onClick={this.openDialogueChoices}>
                <span key="textboxName" className="textbox__name">Каики Ахиру</span>
                <p key="textboxText" className="textbox__text textbox__text--mobile">{screen.text}</p>
                <div key="textboxBlinker" className="textbox__blinker">продолжить...</div>
              </div>
            </section>
          </div>
        );
    }
  }

  render() {
    if (this.state.choicesFor) {
      return (
        <div className="mobile-fullscreen-controls">
          <section className="mobile-controls">
            <div className="textbox textbox--mobile">
              <span key="textboxName" className="textbox__name">Каики Ахиру</span>
              <p key="textboxText" className="textbox__text textbox__text--mobile">
                {this.state.choicesFor.text}
              </p>
              <div key="textboxBlinker" />
            </div>
          </section>
          <section>
            {this.state.choicesFor.choices.map(({ text, next }, i) => (
              <a className="button button--dialogue-choice button--mobile-dialogue-choice" key={i}
                 onClick={this.advanceDialogue(next)}>{text}</a>
            ))}
        </section>
        </div>
      );
    }
    else return this.renderScreen(this.props.screen);
  }
}

const mapStateToProps = ({ screen, player: { day, name } }) => ({ screen, day, name });

const mapDispatchToProps = (dispatch) => ({
  dispatchNextScreen: (nextId) => dispatch(nextScreen(nextId))
});

const MobileGameView = connect(mapStateToProps, mapDispatchToProps)(MobileGame)

export default MobileGameView;
