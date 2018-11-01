import React, { Component } from 'react';

export default class Graph extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <svg className="graph" ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
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
          <g id="graph__points">
            <circle v-for="pt in historyPoints" cx="pt[0]" cy="pt[1]"
                    strokeWidth="0" fill="pt[2] ? 'green' : 'red'" r="3"></circle>
          </g>
        </svg>
      </div>
    );
  }
}
