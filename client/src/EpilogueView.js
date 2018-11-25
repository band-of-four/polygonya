import React, { Component } from 'react';
import { connect } from 'react-redux';

import GraphSVG from './GraphSVG.js';

const TESTS_REQUIRED = 2;
const RELATIONSHIP_REQUIRED = 5;

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
  { x: -6.0, y: 6.0, inside: false },
  { x: 3.0, y: 3.0, inside: false }
];

class Epilogue extends Component {
  constructor(props) {
    super(props);
    this.state = { finished: false, points: [] };
  }

  render() {
    const mark = this.state.finished && (
      <div className="epilogue__test-mark">
        {this.props.testPassed ? 'пройдено' : 'потрачено'}
      </div>
    );

    return (
      <section className={`epilogue ${this.props.className}`}>
        <div className="epilogue__graph-container">
          <GraphSVG r={10} points={this.state.points} />
        </div>
        {mark}
      </section>
    );  
  }

  placePoint = () => {
    const points = this.props.testPassed ? POINTS_TEST_PASSED : POINTS_TEST_FAILED;
    const nextIndex = this.state.points.length;

    if (nextIndex === 10) {
      this.setState({ finished: true });
      /* Look at the commit date */
      const ending = this.props.testPassed ? this.props.relationshipOk ? 'good' : 'neutral' : 'fail';

      setTimeout(() => this.props.onFinished(ending), 1000);
      return;
    }

    this.setState({ points: this.state.points.concat([points[nextIndex]]) });
    setTimeout(this.placePoint.bind(this), 1000);
  };

  componentDidMount() {
    this.placePoint();
  }
}

const mapStateToProps = ({ player }) => ({
  testPassed: player.testsDone >= TESTS_REQUIRED,
  relationshipOk: player.relationship >= RELATIONSHIP_REQUIRED
});

const EpilogueView = connect(mapStateToProps, () => ({}))(Epilogue)

export default EpilogueView;
