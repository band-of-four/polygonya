import { SCRIPT, SCRIPT_GRAPH } from '../script.js';

export const SCREEN_NEXT = 'SCREEN_NEXT';
export const SCREEN_GRAPH = 'SCREEN_GRAPH';
export const SCREEN_GRAPH_INSIDE = 'SCREEN_GRAPH_INSIDE';
export const SCREEN_GRAPH_OUTSIDE = 'SCREEN_GRAPH_OUTSIDE';
export const SCREEN_GRAPH_ERROR = 'SCREEN_GRAPH_ERROR';
export const SCREEN_GRAPH_INVALID_FIELD = 'SCREEN_GRAPH_INVALID_FIELD';
export const SCREEN_GRAPH_END = 'SCREEN_GRAPH_END';

const defaultState = SCRIPT.DAY_1;

export default function screen(state = defaultState, action) {
  switch (action.type) {
    case SCREEN_NEXT:
      const screen = SCRIPT[action.to];
      if (screen.type === SCRIPT_GRAPH)
        return graphPick('neutral', action.to);
      return screen;
    case SCREEN_GRAPH:
      return graphPick('neutral', state.graphId);
    case SCREEN_GRAPH_INSIDE:
      return graphPick('inside', state.graphId);
    case SCREEN_GRAPH_OUTSIDE:
      return graphPick('outside', state.graphId);
    case SCREEN_GRAPH_ERROR:
      return graphPick('error', state.graphId);
    case SCREEN_GRAPH_INVALID_FIELD:
      const { field, min, max } = action;
      const [ sprite, text ] = SCRIPT[state.graphId].invalidField(field, min, max);
      return { type: SCRIPT_GRAPH, sprite, text, graphId: state.graphId };
    case SCREEN_GRAPH_END:
      return SCRIPT[state.graphId].end;
    default:
      return state;
  }
}

function graphPick(stateKind, graphId) {
  const [ sprite, text ] = SCRIPT[graphId][stateKind];
  return { type: SCRIPT_GRAPH, sprite, text, graphId };
}
