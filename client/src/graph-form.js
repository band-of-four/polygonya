import React from 'react';
import Graph from './graph.js';

export default class GraphForm extends React.Component {
  render() {
    return (
      <form className="graph-form" noValidate={true}>
        <section className="graph-form__columns">
          <div className="graph-form__input-column">
            <div className="graph-form__field">
              <label className="graph-form__label">R</label>
              <input type="number" step="0.1" v-model="r" name="r" className="graph-form__input" autoFocus={true} />
            </div>
            <div className="graph-form__field">
              <label className="graph-form__label">X</label>
              <input type="number" step="0.1" v-model="x" name="x" className="graph-form__input" />
            </div>
            <div className="graph-form__field">
              <label className="graph-form__label">Y</label>
              <input type="number" step="0.1" v-model="y" name="y" className="graph-form__input" />
            </div>
          </div>
          <Graph className="graph-form__graph-column" />
        </section>
        <div>
          <input type="submit" name="submit" value="Решение" className="graph-form__button" />
          <input type="button" value="Воспоминания" onClick={this.props.showHistory} className="graph-form__button" />
        </div>
      </form>
    );
  }
}
