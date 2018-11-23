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
          <path d="M0 199l80 1h320a1 1 90 0 0 0-2H80l-80 1z"/>
          <path d="M198 0a12362 12362 0 0 0-1 200l1 120 1 80v-80-120a16253 16253 0 0 1 1-200 1 1 90 0 0-2 0z"/>
          <path d="M199 0l-1 1-1 2-1 2v2l1-1 1-2 1-2V0z"/>
          <path d="M199 0v2l1 2 1 2 1 1V5l-1-2-1-2-1-1z"/>
          <path d="M400 199l-1-1-2-1-2-1h-1l1 1 2 1 2 1h1z"/>
          <path d="M400 199h-1l-2 1-2 1-1 1h1l2-1 2-1 1-1z"/>
        </g>
        <path fill="#6d6d6d" d="M198 120a693 693 0 0 1 45 42l21 23 15 14-13-16-21-22a662 662 0 0 0-45-43 1 1 90 0 0-2 2z"/>
        <path fill="#6d6d6d" d="M39 119l-1 18a700 700 0 0 0 0 62 1 1 90 0 0 2 0v-16-24-22l-1-18z"/>
        <path fill="#6d6d6d" d="M39 119l32 1 48-1a3868 3868 0 0 1 80 1l1-1-1-1a2942 2942 0 0 0-80-1l-48 1-32 1z"/>
        <path fill="#6d6d6d" d="M199 359c-7-1-19-1-33-4A151 151 0 0 1 49 249a167 167 0 0 1-9-50 1 1 90 0 0-2-1 140 140 0 0 0 9 52 176 176 0 0 0 41 67 144 144 0 0 0 78 39l33 3z"/>
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
