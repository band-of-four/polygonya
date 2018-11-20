export const GRAPH_ADD_POINT = "GRAPH_ADD_POINT";
export const GRAPH_SET_FIELD = "GRAPH_SET_FIELD";
export const GRAPH_RESET = "GRAPH_RESET";

const defaultState = {
  r: 2,
  x: 1,
  y: 1,
  points: []
}

export const GRAPH_FIELD_VALID_RANGES = {
  r: { min: 1, max: 5 },
  x: { min: -3, max: 5 },
  y: { min: -5, max: 3 }
};

export default function graph(state = defaultState, action) {
  switch (action.type) {
    case GRAPH_ADD_POINT:
      return { ...state, points: state.points.concat(action.result) };
    case GRAPH_SET_FIELD:
      return { ...state, [action.field]: action.value }; 
    case GRAPH_RESET:
      return defaultState;
    default:
      return state;
  }
}
