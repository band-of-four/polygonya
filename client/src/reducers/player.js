export const PLAYER_RELATIONSHIP_UP = 'PLAYER_RELATIONSHIP_UP';
export const PLAYER_RELATIONSHIP_DOWN = 'PLAYER_RELATIONSHIP_DOWN';
export const PLAYER_TEST_DONE ='PLAYER_TEST_DONE';
export const PLAYER_SET = 'PLAYER_SET'

const defaultState = {
  name: 'Анон',
  day: 1,
  relationship: 0,
  relationshipDelta: 0,
  testsDone: 0
};

export default function player(state = defaultState, action) {
  switch (action.type) {
    case PLAYER_SET:
      const { name, day, relationship, relationshipDelta, testsDone } = action;
      return { name, day, relationship, relationshipDelta, testsDone };
    case PLAYER_RELATIONSHIP_UP:
      return { ...state, relationship: state.relationship + 1, relationshipDelta: 1 };
    case PLAYER_RELATIONSHIP_DOWN:
      return { ...state, relationship: state.relationship - 1, relationshipDelta: -1 };
    case PLAYER_TEST_DONE:
      return { ...state, testsDone: state.testsDone + 1 };
    default:
      return state;
  }
}
