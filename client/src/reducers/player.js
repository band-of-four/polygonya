export const PLAYER_RELATIONSHIP_UP = 'PLAYER_RELATIONSHIP_UP';
export const PLAYER_RELATIONSHIP_DOWN = 'PLAYER_RELATIONSHIP_DOWN';
export const PLAYER_SET = 'PLAYER_SET'

const defaultState = {
  name: 'Анон',
  day: 0,
  relationship: 0,
  relationshipDelta: 0
};

export default function player(state = defaultState, action) {
  switch (action.type) {
    case PLAYER_SET:
      const { name, day, relationship, relationshipDelta } = action;
      return { name, day, relationship, relationshipDelta };
    case PLAYER_RELATIONSHIP_UP:
      return { ...state, relationship: state.relationship + 1, relationshipDelta: 1 };
    case PLAYER_RELATIONSHIP_DOWN:
      return { ...state, relationship: state.relationship - 1, relationshipDelta: -1 };
    default:
      return state;
  }
}
