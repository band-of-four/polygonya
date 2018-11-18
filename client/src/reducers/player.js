export const PLAYER_NEXT_DAY = 'PLAYER_NEXT_DAY';
export const PLAYER_RELATIONSHIP_UP = 'PLAYER_RELATIONSHIP_UP';
export const PLAYER_RELATIONSHIP_DOWN = 'PLAYER_RELATIONSHIP_DOWN';
export const PLAYER_SET = 'PLAYER_SET'

const defaultState = {
  name: 'Анон',
  day: 0,
  relationshipMeter: 0,
  relationshipDelta: 0
};

export default function player(state = defaultState, action) {
  switch (action.type) {
    case PLAYER_NEXT_DAY:
      return { ...state, day: state.day + 1 };
    case PLAYER_SET:
      const { name, day, relationshipMeter, relationshipDelta } = action;
      return { name, day, relationshipMeter, relationshipDelta };
    default:
      return state;
  }
}
