import React, { Component } from 'react';

export default class Typewriter extends Component {
  constructor(props) {
    super(props);
    this.state = { printed: '', hidden: props.text, length: props.text.length };
  }

  render() {
    return (<>
      {this.state.printed}
      <span className="js-typewriter-hidden">{this.state.hidden}</span>
    </>);
  }

  componentDidMount() {
    setTimeout(this.typeLetter(), this.props.initDelay);
  }

  typeLetter = () => {
    if (this.state.hidden.length === 0)
      return setTimeout(this.props.onTypingEnd, 100);

    const letter = this.state.hidden[0];
    const prevLetter = this.state.printed.substr(-1);

    this.setState({
      printed: this.state.printed + letter,
      hidden: this.state.hidden.slice(1, this.state.hidden.length)
    });

    if (letter === ' ') {
      if (prevLetter === '.' || prevLetter === '!' || prevLetter === '?')
        return setTimeout(this.typeLetter, 250);
      else if (prevLetter === ',')
        return setTimeout(this.typeLetter, 80);
      else
        return setTimeout(this.typeLetter, 15);
    }

    if (this.state.length < 12)
      setTimeout(this.typeLetter, 60);
    else
      setTimeout(this.typeLetter, 40);
  }
}
