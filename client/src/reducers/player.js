import { transliterateName } from '../utils.js';

export const PLAYER_NEXT_DAY = 'PLAYER_NEXT_DAY';
export const PLAYER_RELATIONSHIP_UP = 'PLAYER_RELATIONSHIP_UP';
export const PLAYER_RELATIONSHIP_DOWN = 'PLAYER_RELATIONSHIP_DOWN';
export const PLAYER_SET = 'PLAYER_SET'

const defaultState = {
  name: transliterateName('Анон'),
  day: 0,
  relationshipMeter: 0
};

export default function player(state = defaultState, action) {
  switch (action.type) {
    case PLAYER_NEXT_DAY:
      return { ...state, day: state.day + 1 };
    case PLAYER_SET:
      return { name: action.name, day: action.day, relationshipMeter: action.relationship };
    default:
      return state;
  }
}
