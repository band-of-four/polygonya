import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPoint, addPointByXY, setField } from './actions/graph.js';
import GraphSVG from './GraphSVG.js';

class Graph extends Component {
  render() {
    const containedFields = this.props.fieldsClass ? (
      <section className={this.props.fieldsClass}>
        {this.renderField('r')}{this.renderField('x')}{this.renderField('y')}
      </section>
    ) : (
      <>{this.renderField('r')}{this.renderField('x')}{this.renderField('y')}</>
    );

    return (
      <>
        <form className={this.props.formClass} onSubmit={this.submitFields}>
          {containedFields}
          <button type="submit" className="button button--graph">Поставить</button>
        </form>
        <section className={this.props.graphClass}>
          <GraphSVG r={this.props.r} points={this.props.points} onPointPlaced={this.addPoint} />
        </section>
      </>
    );
  }

  renderField(field) {
    return (
      <div className="graph-field">
        <label className="graph-field__label">{field.toUpperCase()}</label>
        <input type="number" step="0.01" name={field} className="graph-field__input"
          onChange={this.updateFieldState} value={this.props[field]} />
      </div>
    );
  }

  updateFieldState = ({ target: { name, value } }) =>
    this.props.dispatchSetField(name, value).then((res) =>
      res === 'finished' && this.props.onTestFinish());

  submitFields = (e) => {
    e.preventDefault();
    this.props.dispatchAddPoint()
      .then((finished) => finished && this.props.onTestFinish());
  }

  addPoint = (x, y) => {
    this.props.dispatchAddPointXY(x, y)
      .then((finished) => finished && this.props.onTestFinish());
  }
}

const mapStateToProps = ({ graph }) => graph;
const mapDispatchToProps = (dispatch) => ({
  dispatchAddPoint: () => dispatch(addPoint()),
  dispatchAddPointXY: (x, y) => dispatch(addPointByXY(x, y)),
  dispatchSetField: (field, value) => dispatch(setField(field, value))
});

const GraphView = connect(mapStateToProps, mapDispatchToProps)(Graph)

export default GraphView;
