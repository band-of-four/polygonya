import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPoint, fieldError, resetErrors } from './actions/graph.js';
import GraphSVG from './GraphSVG.js';

const validInputRanges = {
  r: { min: 1, max: 5 },
  x: { min: -3, max: 5 },
  y: { min: -5, max: 3 }
};

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { r: 2, x: 1, y: 1 };
  }

  render() {
    return (
      <>
        <form className={this.props.fieldsClass} onSubmit={this.submitFields}>
          {this.renderField('r')}{this.renderField('x')}{this.renderField('y')}
          <button type="submit" className="button button--graph">Поставить</button>
        </form>
        <section className={this.props.graphClass}>{this.renderGraph()}</section>
      </>
    );
  }

  renderField(field) {
    return (
      <div className="graph-field">
        <label className="graph-field__label">{field.toUpperCase()}</label>
        <input type="number" step="0.1" name={field} className="graph-field__input"
          onChange={this.updateFieldState} value={this.state[field]} />
      </div>
    );
  }

  renderGraph() {
    const { x: { min: minX, max: maxX }, y: { min: minY, max: maxY } } = validInputRanges;
    return (
      <GraphSVG r={this.state.r} points={this.props.points}
        onPointPlaced={this.onPointPlaced} onFieldError={this.dispatchFieldError}
        minX={minX} maxX={maxX} minY={minY} maxY={maxY} />
    );
  }

  updateFieldState = ({ target: { name: field, value: rawValue } }) => {
    const value = parseFloat(rawValue);
    const { min, max } = validInputRanges[field];

    if (isNaN(value) || value < min || value > max)
      this.props.dispatchFieldError(field, min, max);
    else {
      this.props.dispatchResetErrors();
      this.setState({ ...this.state, [field]: value })
    }
  };

  submitFields = (e) => {
    e.preventDefault();
    const { r, x, y } = this.state;
    this.props.dispatchAddPoint(x, y, r);
  }

  onPointPlaced = (x, y) => {
    this.setState({ ...this.state, x, y });
    this.props.dispatchAddPoint(x, y, this.state.r);
  }
}

const mapStateToProps = (state) => ({ points: state.graph.points });

const mapDispatchToProps = (dispatch) => ({
  dispatchAddPoint: (x, y, r) => dispatch(addPoint(x, y, r)),
  dispatchFieldError: (field, min, max) => dispatch(fieldError(field, min, max)),
  dispatchResetErrors: () => dispatch(resetErrors())
});

const GraphView = connect(mapStateToProps, mapDispatchToProps)(Graph)

export default GraphView;
