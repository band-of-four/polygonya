export const GRAPH_ADD_POINT = "GRAPH_ADD_POINT";

const defaultState = { points: [] }

export default function graph(state = defaultState, action) {
  switch (action.type) {
    case GRAPH_ADD_POINT:
      return { points: state.points.concat(action.result) }
    default:
      return state
  }
}
