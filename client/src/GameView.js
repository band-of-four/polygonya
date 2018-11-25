import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SCRIPT_CUTSCENE, SCRIPT_DIALOGUE, SCRIPT_GRAPH, SCRIPT_EPILOGUE, screenType } from './script.js';
import { nextScreen } from './actions/game.js';
import { finishGraph } from './actions/graph.js';
import GraphView from './GraphView.js';
import Typewriter from './Typewriter.js';
import GameDialogueMobile from './GameDialogueMobile.js';
import EpilogueView from './EpilogueView.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { popInControls: false, popOutControls: false, fadeOut: false };
  }

  renderCutscreen = (screen) => {
    const choices = screen.choices || [['Продолжить', screen.next]];
    const controlsClass = `cutscene__controls js-controls ${this.state.popInControls ? 'js-controls--pop-in' : this.state.popOutControls ? 'js-controls--pop-out' : ''}`;
    return (
      <div className={`cutscene js-screen ${this.state.fadeOut ? 'fade-out' : ''}`} onClick={() => this.refs.typewriter.finishTyping()}>
        <p className="cutscene__content">
          <Typewriter text={screen.text} key={screen.text} initDelay={600} ref="typewriter"
            onTypingEnd={() => this.setState({ popInControls: true })} />
        </p>
        {screen.sprite && <section className="cutscene__image"><img src={screen.sprite} /></section>}
        <section className={controlsClass}>
          {choices.map(([ text, next ], i) =>
            <a className="button button--inline" key={i}
              onClick={() => this.nextScreen(screen.type, next)}>{text}</a>
          )}
        </section>
      </div>
    );
  };

  renderGraph = (isMobile) => {
    if (isMobile) return (
      <div class={`mobile-grid js-screen ${this.state.fadeOut ? 'fade-out' : 'fade-in'}`}>
        <GraphView formClass="mobile-grid__form" graphClass="mobile-grid__graph"
          fieldsClass="mobile-graph-fields" onTestFinish={this.finishGraphTest} />
      </div>
    );

    return this.renderGrid("grid--graph", this.props.screen,
      <GraphView formClass="grid__fields" graphClass="grid__graph"
        onTestFinish={this.finishGraphTest} />
    );
  };

  renderDialogue = (isMobile) => {
    if (isMobile)
      return <GameDialogueMobile key={this.props.screen.text}
        screen={this.props.screen} screenClass={`js-screen ${this.state.fadeOut ? 'fade-out' : ''}`}
        playerName={this.props.name} day={this.props.day}
        onHistory={this.props.onHistory} onLogout={this.props.onLogout}
        onNextScreen={(next) => this.nextScreen(this.props.screen.type, next)} />

    const controlsClass = `grid__controls js-controls ${this.state.popInControls ? 'js-controls--pop-in' : this.state.popOutControls ? 'js-controls--pop-out' : ''}`;
    return this.renderGrid("grid--dialogue", this.props.screen,
      <section key="controls" className={controlsClass} onClick={() => this.refs.typewriter.finishTyping()}>
        {this.props.screen.choices.map(([ text, next ], i) => (
          <a className="button button--dialogue-choice" key={i}
             onClick={() => this.nextScreen(this.props.screen.type, next)}>{text}</a>
        ))}
      </section>
    );
  };

  renderGrid = (gridClass, screen, controls) => (
    <div className={`grid ${gridClass} js-screen ${this.state.fadeOut ? 'fade-out' : ''}`}>
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
          <p key="textboxText" className="textbox__text">
            <Typewriter text={screen.text} key={screen.text} initDelay={600}
              ref="typewriter" onTypingEnd={() => this.setState({ popInControls: true })} />
          </p>
        </div>
      </section>
      {controls}
    </div>
  );

  render() {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    switch (this.props.screen.type) {
      case SCRIPT_CUTSCENE: return this.renderCutscreen(this.props.screen);
      case SCRIPT_GRAPH:    return this.renderGraph(isMobile);
      case SCRIPT_DIALOGUE: return this.renderDialogue(isMobile);
      case SCRIPT_EPILOGUE: return <EpilogueView className={this.state.fadeOut ? 'fade-out' : ''} onFinished={(ending) => {
        this.nextScreen(this.props.screen.type, this.props.screen[ending])
      }} />;
    }
  }

  nextScreen = (currentType, scriptId) => {
    this.setState({ popInControls: false, popOutControls: true });
    if (currentType !== screenType(scriptId)) {
      setTimeout(() => {
        this.setState({ fadeOut: true });
        setTimeout(() => {
          this.props.dispatchNextScreen(scriptId);
          this.setState({ popOutControls: false, fadeOut: false });
        }, 600);
      }, 600);
    }
    else if (currentType === SCRIPT_DIALOGUE || currentType === SCRIPT_CUTSCENE) {
      this.setState({ popInControls: false, popOutControls: true });
      setTimeout(() => {
        this.props.dispatchNextScreen(scriptId);
        this.setState({ popOutControls: false });
      }, 600);
    }
    else this.props.dispatchNextScreen(scriptId);
  }

  finishGraphTest = () => {
    this.setState({ popInControls: false, fadeOut: true });
    setTimeout(() => {
      this.props.dispatchFinishGraph();
      this.setState({ fadeOut: false });
    }, 900);
  }
}

const mapStateToProps = ({ screen, player: { day, name } }) => ({ screen, day, name });
const mapDispatchToProps = (dispatch) => ({
  dispatchNextScreen: (nextId) => dispatch(nextScreen(nextId)),
  dispatchFinishGraph: () => dispatch(finishGraph())
});

const GameView = connect(mapStateToProps, mapDispatchToProps)(Game)

export default GameView;
