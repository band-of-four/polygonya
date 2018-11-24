import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SCRIPT_CUTSCENE, SCRIPT_DIALOGUE, SCRIPT_GRAPH, screenType } from './script.js';
import { nextScreen } from './actions/game.js';
import { finishGraph } from './actions/graph.js';
import GraphView from './GraphView.js';
import Typewriter from './Typewriter.js';
import GameDialogueMobile from './GameDialogueMobile.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { showControls: false };
  }

  renderCutscreen = (screen) => {
    const choices = screen.choices || [['Продолжить', screen.next]];
    const controlsClass = `cutscene__controls js-controls ${this.state.showControls ? 'js-controls--shown' : ''}`;
    return (
      <div className="cutscene js-screen" onClick={() => this.refs.typewriter.finishTyping()}>
        <p className="cutscene__content">
          <Typewriter text={screen.text} key={screen.text} initDelay={600} ref="typewriter"
            onTypingEnd={() => this.setState({ showControls: true })} />
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
      <div class="mobile-grid fade-in js-screen">
        <header key="menu" className="mobile-menu-toggle button">...</header>
        <GraphView key="graph" formClass="mobile-grid__form" fieldsClass="mobile-graph-fields" graphClass="mobile-grid__graph"
          onTestFinish={this.finishGraphTest} />
      </div>
    );

    return this.renderGrid("grid--graph", this.props.screen,
      <GraphView key="graph" formClass="grid__fields" graphClass="grid__graph"
         onTestFinish={this.finishGraphTest} />
    );
  };

  renderDialogue = (isMobile) => {
    if (isMobile)
      return <GameDialogueMobile key={this.props.screen.text}
        screen={this.props.screen} screenClass="js-screen"
        onNextScreen={(next) => this.nextScreen(this.props.screen.type, next)} />

    const controlsClass = `grid__controls js-controls ${this.state.showControls ? 'js-controls--shown' : ''}`;
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
    <div className={`grid ${gridClass} js-screen`}>
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
              ref="typewriter" onTypingEnd={() => this.setState({ showControls: true })} />
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
    }
  }

  nextScreen = (currentType, scriptId) => {
    this.state.showControls = false; // FIXME: dirty hack to avoid state update
    if (currentType !== screenType(scriptId)) {
      document.querySelector('.js-controls').classList.add('js-controls--hidden');
      setTimeout(() => {
        document.querySelector('.js-screen').classList.add('fade-out');
        setTimeout(() => this.props.dispatchNextScreen(scriptId), 600);
      }, 600);
    }
    else if (currentType === SCRIPT_DIALOGUE || currentType === SCRIPT_CUTSCENE) {
      document.querySelector('.js-controls').classList.add('js-controls--hidden');
      setTimeout(() => this.props.dispatchNextScreen(scriptId), 600);
    }
    else this.props.dispatchNextScreen(scriptId);
  }

  finishGraphTest = () => {
    this.state.showControls = false; // FIXME: dirty hack to avoid state update
    document.querySelector('.js-screen').classList.add('fade-out');
    setTimeout(() => this.props.dispatchFinishGraph(), 900);
  }
}

const mapStateToProps = ({ screen, player: { day, name } }) => ({ screen, day, name });
const mapDispatchToProps = (dispatch) => ({
  dispatchNextScreen: (nextId) => dispatch(nextScreen(nextId)),
  dispatchFinishGraph: () => dispatch(finishGraph())
});

const GameView = connect(mapStateToProps, mapDispatchToProps)(Game)

export default GameView;
