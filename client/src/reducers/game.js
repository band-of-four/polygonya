import { GAME_SCRIPT } from '../script.js';

export const GAME_ADVANCE = 'GAME_ADVANCE';

const defaultState = GAME_SCRIPT.DAY_0;

export default function game(state = defaultState, action) {
  switch (action.type) {
    case GAME_ADVANCE:
      return GAME_SCRIPT[action.to];
    default:
      return state
  }
}
