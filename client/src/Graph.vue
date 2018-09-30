<template>
<div class="graph-container">
  <svg class="graph" @click="placePoint" ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <g id="graph__coordinate-plane">
      <!-- horizontal and vertical axes -->
      <path fill="none" stroke="#000" stroke-width="1px" d="M0 199h400"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 0v400"/>
      <!-- arrows -->
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 0l-3 7"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 0l3 7"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M400 199l-6-3"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M400 199l-6 3"/>
    </g>
    <path fill="none" stroke="#000" stroke-width="1px" d="M199 39l160 160"/>
    <path fill="none" stroke="#000" stroke-width="1px" d="M359 199v80"/>
    <path fill="none" stroke="#000" stroke-width="1px" d="M359 279H199"/>
    <path fill="none" stroke="#000" stroke-width="1px" d="M199 279q-80-10-80-80"/>
    <text x="180" y="44" font-weight="400">
      <tspan x="180" y="44" font-size="16px">R</tspan>
    </text>
    <text x="106" y="190" font-weight="400">
      <tspan x="106" y="190" font-size="16px">R/2</tspan>
    </text>
    <text x="166" y="296" font-weight="400">
      <tspan x="166" y="296" font-size="16px">R/2</tspan>
    </text>
    <text x="360" y="190" font-weight="400">
      <tspan x="360" y="190" font-size="16px">R</tspan>
    </text>
    <g id="graph__points">
      <circle v-for="pt in graphPoints" :cx="pt[0]" :cy="pt[1]"
              stroke-width="0" fill="black" r="3"></circle>
    </g>
  </svg>
</div>
</template>

<script>
export default {
  name: 'Graph',
  components: {},
  data() {
    return {
      graphPoints: []
    }
  },
  methods: {
    placePoint(e) {
      const referencePt = this.$refs.svg.createSVGPoint();
      referencePt.x = e.clientX;
      referencePt.y = e.clientY;

      const axisDim = 400;
      const rDim = 160;

      const { x: graphX, y: graphY } = referencePt.matrixTransform(
        this.$refs.svg.getScreenCTM().inverse());

      const x = (graphX - (axisDim / 2)) / rDim;
      const y = (graphY - (axisDim / 2)) / rDim;

      this.graphPoints.push([graphX, graphY]);

      this.$emit('point-placed', { x, y });
    }
  }
}
</script>

<style>
.graph {
  height: 100%;
  width: 100%;
}
</style>
