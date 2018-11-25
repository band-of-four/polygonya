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
        <g fill="#6d6d6d">
          <path d="M0 199l28 1h372v-2H80z"/>
          <path d="M198 0l-1 200 1 152 1 48V200l1-200z"/>
          <path d="M198 0l-1 3-4 10 1-2 3-5 1-2 1-2-1-2z"/>
          <path d="M199 0v2l1 2 3 7 2 2-3-7-2-6h-1z"/>
          <path d="M400 199v-1l-4-2-4-1-3-1 5 3 3 1 2 1z"/>
          <path d="M400 199h-1l-2 1-2 1-6 2h3l4-1 4-2v-1z"/>
        </g>
        <path fill="#6d6d6d" d="M199 121c15 13 29 25 44 40l32 36 4 2-13-16-21-22c-14-15-29-29-45-43-1-1-3 2-1 3z"/>
        <path fill="#6d6d6d" d="M39 119l-1 5c-1 8-3 53-2 74l4 1v-62z"/>
        <path fill="#6d6d6d" d="M39 119l2 1 78-1 80 2 1-2-1-2h-80l-48 1z"/>
        <path fill="#6d6d6d" d="M199 359c-3-2-15-2-25-4-67-9-109-51-125-106-6-16-9-33-9-50 1-1-3-3-4-1 0 17 5 35 11 52 8 25 23 50 42 69 21 21 48 32 77 37z"/>
        <text x="100" y="190" fill="#6d6d6d">
          <tspan x="14" y="190" fontFamily="Neucha" fontSize="17" fontWeight="400">-R</tspan>
        </text>
        <text x="166" y="296" fill="#6d6d6d">
          <tspan x="209" y="360" fontFamily="Neucha" fontSize="17" fontWeight="400">R</tspan>
        </text>
        <text x="360" y="182" fill="#6d6d6d">
          <tspan x="209" y="117" fontFamily="Neucha" fontSize="17" fontWeight="400">R/2</tspan>
        </text>
        <text x="418" y="282" fill="#6d6d6d">
          <tspan x="267" y="217" fontFamily="Neucha" fontSize="17" fontWeight="400">R/2</tspan>
        </text>
        <g id="graph__points">{this.renderPoints()}</g>
      </svg>
    );
  }
}
