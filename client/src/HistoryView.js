import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APP_UI_GAME } from './reducers/app.js';


class History extends Component {
  constructor(props) {
    super(props);
    this.state = { history: [], isLoading: true };
  }

  render() {
    if (this.state.isLoading)
      return ( 
        <h1>Loading...</h1>
      );
    else
      return (
      <div>
        <button type="button" className="button" onClick={this.props.dispatchReturn}>Вернуться в реальность</button>
        <div>{this.props.history}</div>
      </div>
      );  
    }

  componentDidMount() {
    fetch("/sync/history", { method: 'GET', credentials: 'include' })
      .then(response => response.json())
      .then(data => this.setState({ history: data.history, isLoading: false }))
      .then(this.render());
  }
}



const mapDispatchToProps = (dispatch) => ({
  dispatchReturn: () => dispatch({ type: APP_UI_GAME })
});

const HistoryView = connect(() => ({}), mapDispatchToProps)(History)

export default HistoryView;
