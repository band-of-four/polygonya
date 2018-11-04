import React, { Component } from 'react';
import { connect } from 'react-redux';

class Story extends Component {
  render() {
    return (
      <div className="grid">
        <header key="header" className="grid__header header">
          <a className="header__link" key="homeLink" href="#">Polygonya</a>
          <a className="header__link" key="aboutLink" href="#">?</a>
        </header>
        <section key="sprite" className="grid__sprite sprite" style={this.props.spriteStyle} />
        <section key="textbox" className="grid__textbox">
          <div key="quote" className="quote">
            <span key="quoteSpeaker" className="quote__speaker">Каики Ахиру</span>
            <p key="quoteContent" className="quote__content">{this.props.quote}</p>
          </div>
        </section>
        <section key="controls" className="grid__controls controls">
          <a className="controls__action">Может, перейдем к делу?</a>
          <a className="controls__action">Ты выглядишь задумчивой... Все хорошо?</a>
          <a className="controls__action">Я устал, давай соберемся завтра, а сейчас пойдем по домам?</a>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spriteStyle: { backgroundImage: `url('/assets/${state.chan.sprite}')` },
    quote: state.chan.quote
  };
}

const StoryView = connect(mapStateToProps, () => ({}))(Story)

export default StoryView;
