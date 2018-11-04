import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPoint, fieldError, resetErrors } from './actions/graph.js';

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
          <div className="graph-field">
            <label className="graph-field__label">R</label>
            <input type="number" step="0.1" name="r" className="graph-field__input"
              onChange={this.updateFieldState} value={this.state.r} />
          </div>
          <div className="graph-field">
            <label className="graph-field__label">X</label>
            <input type="number" step="0.1" name="x" className="graph-field__input"
              onChange={this.updateFieldState} value={this.state.x} />
          </div>
          <div className="graph-field">
            <label className="graph-field__label">Y</label>
            <input type="number" step="0.1" name="y" className="graph-field__input"
              onChange={this.updateFieldState} value={this.state.y} />
          </div>
          <button type="submit" className="button button--graph">Поставить</button>
        </form>
        <section className={this.props.graphClass}>{this.renderGraph()}</section>
      </>
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

  placePoint = (e) => {
    const referencePt = this.refs.svg.createSVGPoint();
    referencePt.x = e.clientX;
    referencePt.y = e.clientY;

    const axisDim = 400;
    const rDim = 160;

    const { x: graphX, y: graphY } = referencePt.matrixTransform(
      this.refs.svg.getScreenCTM().inverse());

    const x = Number(((graphX - (axisDim / 2)) / rDim * this.state.r).toFixed(2));
    const y = Number((-((graphY - (axisDim / 2)) / rDim) * this.state.r).toFixed(2));

    const { min: minX, max: maxX } = validInputRanges.x;
    const { min: minY, max: maxY } = validInputRanges.y;

    if (x < minX || x > maxX) this.props.dispatchFieldError('x', minX, maxX);
    else if (y < minY || y > maxY) this.props.dispatchFieldError('y', minY, maxY);
    else {
      this.setState({ ...this.state, x, y });
      this.props.dispatchAddPoint(x, y, this.state.r);
    }
  }

  renderGraphPoints() {
    return this.props.points.map(({ x, y, inside }, i) => {
      const axisDim = 400;
      const rDim = 160;
      const xRel = x / this.state.r;
      const yRel = y / this.state.r;
      const xAbs = (xRel * rDim) + (axisDim / 2);
      const yAbs = (-yRel * rDim) + (axisDim / 2);

      const fill = inside ? 'green': 'red';

      return <circle cx={xAbs} cy={yAbs} key={i} strokeWidth="0" r="3" fill={fill} />
    });
  }

  renderGraph() {
    return (
      <svg className="graph" onClick={this.placePoint} ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <g id="graph__coordinate-plane">
          {/* horizontal and vertical axes */}
          <path fill="none" stroke="#000" strokeWidth="1px" d="M0 199h400"/>
          <path fill="none" stroke="#000" strokeWidth="1px" d="M199 0v400"/>
          {/* arrows */}
          <path fill="none" stroke="#000" strokeWidth="1px" d="M199 0l-3 7"/>
          <path fill="none" stroke="#000" strokeWidth="1px" d="M199 0l3 7"/>
          <path fill="none" stroke="#000" strokeWidth="1px" d="M400 199l-6-3"/>
          <path fill="none" stroke="#000" strokeWidth="1px" d="M400 199l-6 3"/>
        </g>
        <path fill="none" stroke="#000" strokeWidth="1px" d="M39 199l160 160"/>
        <path fill="none" stroke="#000" strokeWidth="1px" d="M39 119v80"/>
        <path fill="none" stroke="#000" strokeWidth="1px" d="M39 119H199"/>
        <path fill="none" stroke="#000" strokeWidth="1px" d="M199 39q+160+20+160+160"/>
        <text x="180" y="44" fontWeight="400"><tspan x="180" y="44" fontSize="16px">R</tspan></text>
        <text x="106" y="190" fontWeight="400"><tspan x="20" y="190" fontSize="16px">R</tspan></text>
        <text x="166" y="296" fontWeight="400"><tspan x="209" y="360" fontSize="16px">R</tspan></text>
        <text x="360" y="190" fontWeight="400"><tspan x="360" y="190" fontSize="16px">R</tspan></text>
        <text x="360" y="190" fontWeight="400"><tspan x="209" y="125" fontSize="16px">R/2</tspan></text>
        <g id="graph__points">{this.renderGraphPoints()}</g>
      </svg>
    );
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
