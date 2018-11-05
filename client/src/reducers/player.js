import { transliterateName } from '../utils.js';

export const PLAYER_NEXT_DAY = 'PLAYER_NEXT_DAY';
export const PLAYER_RELATIONSHIP_UP = 'PLAYER_RELATIONSHIP_UP';
export const PLAYER_RELATIONSHIP_DOWN = 'PLAYER_RELATIONSHIP_DOWN';

const defaultState = {
  name: transliterateName('Анон'),
  day: 0,
  relationshipMeter: 0
};

export default function player(state = defaultState, action) {
  switch (action.type) {
    case PLAYER_NEXT_DAY:
      return { ...state, day: state.day + 1 };
    default:
      return state;
  }
}
