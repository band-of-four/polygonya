import { GAME_SCRIPT,
  GAME_SCRIPT_GRAPH_AWAIT,
  GAME_SCRIPT_GRAPH_INSIDE,
  GAME_SCRIPT_GRAPH_OUTSIDE,
  GAME_SCRIPT_GRAPH_ERROR } from '../script.js';
import { pickRandom } from '../utils.js';

export const GAME_ADVANCE = 'GAME_ADVANCE';
export const GAME_GRAPH_AWAIT = 'GAME_GRAPH_AWAIT';
export const GAME_GRAPH_INSIDE = 'GAME_GRAPH_INSIDE';
export const GAME_GRAPH_OUTSIDE = 'GAME_GRAPH_OUTSIDE';
export const GAME_GRAPH_ERROR = 'GAME_GRAPH_ERROR';

const defaultState = GAME_SCRIPT.DAY_0;

export default function game(state = defaultState, action) {
  switch (action.type) {
    case GAME_ADVANCE:
      return GAME_SCRIPT[action.to];
    case GAME_GRAPH_AWAIT:
      return pickRandom(GAME_SCRIPT_GRAPH_AWAIT);
    case GAME_GRAPH_OUTSIDE:
      return pickRandom(GAME_SCRIPT_GRAPH_OUTSIDE);
    case GAME_GRAPH_INSIDE:
      return pickRandom(GAME_SCRIPT_GRAPH_INSIDE);
    case GAME_GRAPH_ERROR:
      return GAME_SCRIPT_GRAPH_ERROR;
    default:
      return state;
  }
}
