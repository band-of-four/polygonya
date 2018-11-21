import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SCRIPT_CUTSCENE, SCRIPT_DIALOGUE, SCRIPT_GRAPH, screenType } from './script.js';
import { nextScreen } from './actions/game.js';
import { finishGraph } from './actions/graph.js';
import GraphView from './GraphView.js';

class Game extends Component {
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

  render() {
    const screen = this.props.screen;
    switch (screen.type) {
      case SCRIPT_CUTSCENE:
        const choices = screen.choices || [['Продолжить', screen.next]];
        const controls = choices.map(([ text, next ], i) =>
          <a className="button button--inline" key={i}
             onClick={() => this.nextScreen(screen.type, next)}>{text}</a>
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
          <GraphView key="graph" formClass="grid__fields" graphClass="grid__graph"
             onTestFinish={this.finishGraphTest} />
        );
      case SCRIPT_DIALOGUE:
        return this.renderGrid("grid--dialogue", screen,
          <section key="controls" className="grid__controls">
            {screen.choices.map(([ text, next ], i) => (
              <a className="button button--dialogue-choice" key={i}
                 onClick={() => this.nextScreen(screen.type, next)}>{text}</a>
            ))}
          </section>
        );
    }
  }

  nextScreen = (currentType, scriptId) => {
    if (currentType !== screenType(scriptId)) {
      document.querySelector('.cutscene, .grid').classList.add('fade-out');
      setTimeout(() => this.props.dispatchNextScreen(scriptId), 800);
    }
    else this.props.dispatchNextScreen(scriptId);
  }

  finishGraphTest = () => {
    document.querySelector('.grid').classList.add('fade-out');
    setTimeout(() => this.props.dispatchFinishGraph(), 800);
  }
}

const mapStateToProps = ({ screen, player: { day, name } }) => ({ screen, day, name });
const mapDispatchToProps = (dispatch) => ({
  dispatchNextScreen: (nextId) => dispatch(nextScreen(nextId)),
  dispatchFinishGraph: () => dispatch(finishGraph())
});

const GameView = connect(mapStateToProps, mapDispatchToProps)(Game)

export default GameView;
