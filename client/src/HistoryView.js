import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APP_UI_GAME } from './reducers/app.js';


class History extends Component {
  render() {
    return ( 
      <button type="button" className="button" onClick={this.props.dispatchReturn}>Вернуться в реальность</button> 
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchReturn: () => dispatch({ type: APP_UI_GAME })
});

const HistoryView = connect(() => ({}), mapDispatchToProps)(History)

export default HistoryView;
