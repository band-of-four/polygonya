import React, { Component } from 'react';
import { connect } from 'react-redux';

import GraphSVG from './GraphSVG.js';

const TESTS_REQUIRED = 0; /* TODO: 2 */

const POINTS_TEST_PASSED = [
  { x: -5.0, y: -5.0, inside: true },
  { x: -3.0, y: 2.0, inside: true },
  { x: 5.0, y: 5.0, inside: false },
  { x: 1.0, y: 1.0, inside: true },
  { x: -6.0, y: 6.0, inside: false },
  { x: -1.0, y: -1.0, inside: true },
  { x: -0.1, y: 0.5, inside: true },
  { x: -2.0, y: -3.0, inside: true },
  { x: -6.0, y: -1.0, inside: true },
  { x: 2.5, y: 2.5, inside: true }
];

const POINTS_TEST_FAILED = [
  { x: -5.0, y: -5.0, inside: true },
  { x: -3.0, y: 7.0, inside: false },
  { x: 5.0, y: 5.0, inside: false },
  { x: 3.0, y: 5.0, inside: false },
  { x: 1.0, y: -1.0, inside: false },
  { x: -0.1, y: 0.5, inside: true },
  { x: 2.0, y: -3.0, inside: false },
  { x: -6.0, y: -1.0, inside: true },
  { x: -5.0, y: 5.0, inside: false },
  { x: 2.6, y: 2.5, inside: false }
];

class Epilogue extends Component {
  constructor(props) {
    super(props);
    this.state = { finished: false, points: [] };
  }

  render() {
    return (
      <section className={`epilogue ${this.props.className}`}>
        <div className="epilogue__graph-container">
          <GraphSVG r={10} points={this.state.points} />
        </div>
      </section>
    );  
  }

  placePoint = () => {
    console.log(this);
    const points = this.props.testPassed ? POINTS_TEST_PASSED : POINTS_TEST_FAILED;
    const nextIndex = this.state.points.length;

    if (nextIndex === 10) {
      this.setState({ finished: true });
      this.props.onFinished();
      return;
    }

    this.setState({ points: this.state.points.concat([points[nextIndex]]) });
    setTimeout(this.placePoint.bind(this), 1000);
  };

  componentDidMount() {
    this.placePoint();
  }
}

const mapStateToProps = ({ player }) => ({ testPassed: player.testsDone >= TESTS_REQUIRED });
const mapDispatchToProps = (dispatch) => ({ });

const EpilogueView = connect(mapStateToProps, mapDispatchToProps)(Epilogue)

export default EpilogueView;
