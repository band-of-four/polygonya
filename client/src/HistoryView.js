import React, { Component } from 'react';
import { connect } from 'react-redux';

import { APP_UI_GAME } from './reducers/app.js';
import GraphSVG from './GraphSVG.js';

class History extends Component {
  renderHistoryForDay = ([ day, history ]) => (
    <section>
      <p>День #{day}</p>
      <table className="history-table">
        <thead>
          <tr><th>R</th><th>X</th><th>Y</th><th>Результат</th></tr>
        </thead>
        <tbody>
          {history.map(({ r, x, y, inside }) => (
            <tr>
              <td>{r}</td><td>{x}</td><td>{y}</td><td>{inside ? 'внутри' : 'снаружи'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );

  render() {
    return (
      <div className="history neutral-bg">
        <section className="history-controls">
          <button type="button" className="button" onClick={this.props.dispatchReturn}>
            Вернуться в реальность
          </button>
        </section>
        {Object.entries(this.props.history).map(this.renderHistoryForDay)}
      </div>
    );  
  }
}

const mapStateToProps = ({ app }) => ({ history: app.history });
const mapDispatchToProps = (dispatch) => ({
  dispatchReturn: () => dispatch({ type: APP_UI_GAME })
});

const HistoryView = connect(mapStateToProps, mapDispatchToProps)(History)

export default HistoryView;
