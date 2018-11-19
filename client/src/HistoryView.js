import React, { Component } from 'react';
import { connect } from 'react-redux';


class History extends Component {
  render() {
    return ( 
      <h1> Hellow! </h1>
    );
  }
}


const HistoryView = connect(() => ({}), () => ({}))(History)

export default HistoryView;
