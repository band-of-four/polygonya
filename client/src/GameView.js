import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SCRIPT_CUTSCENE, SCRIPT_DIALOGUE, SCRIPT_GRAPH, screenType } from './script.js';
import { nextScreen } from './actions/game.js';
import { finishGraph } from './actions/graph.js';
import GraphView from './GraphView.js';
import Typewriter from './Typewriter.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { showControls: false };
  }

  renderCutscreen = (screen) => {
    const choices = screen.choices || [['Продолжить', screen.next]];
    const controlsClass = this.state.showControls ?
      'cutscene__controls js-controls-shown' : 'cutscene__controls';
    const controls = choices.map(([ text, next ], i) =>
      <a className="button button--inline" key={i}
         onClick={() => this.nextScreen(screen.type, next)}>{text}</a>
    );
    const image = screen.sprite ? (
      <section className="cutscene__image"><img src={screen.sprite} /></section>
    ) : null;
    return (
      <div className="cutscene" onClick={() => this.refs.typewriter.finishTyping()}>
        <p className="cutscene__content">
          <Typewriter text={screen.text} key={screen.text} initDelay={600}
            ref="typewriter" onTypingEnd={() => this.setState({ showControls: true })} />
        </p>
        {image}
        <section className={controlsClass}>{controls}</section>
      </div>
    );
  };

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
    switch (this.props.screen.type) {
      case SCRIPT_CUTSCENE:
        return this.renderCutscreen(this.props.screen);
      case SCRIPT_GRAPH:
        return this.renderGrid("grid--graph", this.props.screen,
          <GraphView key="graph" formClass="grid__fields" graphClass="grid__graph"
             onTestFinish={this.finishGraphTest} />
        );
      case SCRIPT_DIALOGUE:
        const controlsClass = this.state.showControls ?
          'grid__controls js-controls-shown' : 'grid__controls';
        return this.renderGrid("grid--dialogue", this.props.screen,
          <section key="controls" className={controlsClass} onClick={() => this.refs.typewriter.finishTyping()}>
            {this.props.screen.choices.map(([ text, next ], i) => (
              <a className="button button--dialogue-choice" key={i}
                 onClick={() => this.nextScreen(this.props.screen.type, next)}>{text}</a>
            ))}
          </section>
        );
    }
  }

  nextScreen = (currentType, scriptId) => {
    this.state.showControls = false; // FIXME: dirty hack to avoid state update
    if (currentType !== screenType(scriptId)) {
      document.querySelector('.js-controls-shown').classList.add('js-controls-hidden');
      setTimeout(() => {
        document.querySelector('.cutscene, .grid').classList.add('fade-out');
        setTimeout(() => this.props.dispatchNextScreen(scriptId), 600);
      }, 600);
    }
    else if (currentType === SCRIPT_DIALOGUE || currentType === SCRIPT_CUTSCENE) {
      document.querySelector('.js-controls-shown').classList.add('js-controls-hidden');
      setTimeout(() => this.props.dispatchNextScreen(scriptId), 600);
    }
    else this.props.dispatchNextScreen(scriptId);
  }

  finishGraphTest = () => {
    this.state.showControls = false; // FIXME: dirty hack to avoid state update
    document.querySelector('.grid').classList.add('fade-out');
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
