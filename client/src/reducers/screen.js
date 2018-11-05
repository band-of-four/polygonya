import { SCRIPT,
  SCRIPT_GRAPH_AWAIT,
  SCRIPT_GRAPH_INSIDE,
  SCRIPT_GRAPH_OUTSIDE,
  SCRIPT_GRAPH_ERROR,
  scriptGraphInvalidField,
  SCRIPT_GRAPH_NEUTRAL } from '../script.js';
import { pickRandom } from '../utils.js';

export const SCREEN_NEXT = 'SCREEN_NEXT';
export const SCREEN_GRAPH_AWAIT = 'SCREEN_GRAPH_AWAIT';
export const SCREEN_GRAPH_INSIDE = 'SCREEN_GRAPH_INSIDE';
export const SCREEN_GRAPH_OUTSIDE = 'SCREEN_GRAPH_OUTSIDE';
export const SCREEN_GRAPH_ERROR = 'SCREEN_GRAPH_ERROR';
export const SCREEN_GRAPH_INVALID_FIELD = 'SCREEN_GRAPH_INVALID_FIELD';
export const SCREEN_GRAPH_RESET = 'SCREEN_GRAPH_RESET';

const defaultState = SCRIPT.DAY_0;

export default function game(state = defaultState, action) {
  switch (action.type) {
    case SCREEN_NEXT:
      return SCRIPT[action.to];
    case SCREEN_GRAPH_AWAIT:
      return pickRandom(SCRIPT_GRAPH_AWAIT);
    case SCREEN_GRAPH_OUTSIDE:
      return pickRandom(SCRIPT_GRAPH_OUTSIDE);
    case SCREEN_GRAPH_INSIDE:
      return pickRandom(SCRIPT_GRAPH_INSIDE);
    case SCREEN_GRAPH_ERROR:
      return SCRIPT_GRAPH_ERROR;
    case SCREEN_GRAPH_INVALID_FIELD:
      return scriptGraphInvalidField(action.field, action.min, action.max);
    case SCREEN_GRAPH_RESET:
      return SCRIPT_GRAPH_NEUTRAL;
    default:
      return state;
  }
}
