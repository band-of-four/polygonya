import React, { Component } from 'react';

const halfAxisLength = 200;
const rLength = 160;

export default class GraphSVG extends Component {
  renderPoints() {
    return this.props.points.map(({ x, y, inside }, i) => {
      const xUnitR = x / this.props.r;
      const yUnitR= y / this.props.r;
      const graphX = (xUnitR * rLength) + halfAxisLength;
      const graphY = (-yUnitR * rLength) + halfAxisLength;

      const fill = inside ? 'green': 'red';

      return <circle cx={graphX} cy={graphY} key={i} strokeWidth="0" r="3" fill={fill} />
    });
  }

  placePoint = ({ clientX, clientY }) => {
    const referencePt = this.refs.svg.createSVGPoint();
    referencePt.x = clientX;
    referencePt.y = clientY;

    const { x: graphX, y: graphY } = referencePt.matrixTransform(
      this.refs.svg.getScreenCTM().inverse());

    const x = Number(((graphX - halfAxisLength) / rLength * this.props.r).toFixed(2));
    const y = Number((-(graphY - halfAxisLength) / rLength * this.props.r).toFixed(2));
    this.props.onPointPlaced(x, y);
  }

  render() {
    return (
      <svg className="graph" ref="svg" onClick={this.placePoint}
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
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
        <g id="graph__points">{this.renderPoints()}</g>
      </svg>
    );
  }
}
