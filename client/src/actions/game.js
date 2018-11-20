import { SCREEN_NEXT, SCREEN_GRAPH } from '../reducers/screen.js';
import { PLAYER_RELATIONSHIP_UP, PLAYER_RELATIONSHIP_DOWN,
  PLAYER_SET } from '../reducers/player.js';
import { SCRIPT_RELATIONSHIP_UP_END_DAY, SCRIPT_RELATIONSHIP_DOWN_END_DAY,
  SCRIPT_TEST_END_DAY, SCRIPT_GRAPH, scriptIdForDay } from '../script.js';
import { pushAndAdvanceDay } from './app.js';

export const nextScreen = (scriptId) => async (dispatch) => {
  switch (scriptId) {
    case SCRIPT_RELATIONSHIP_UP_END_DAY:
      dispatch({ type: PLAYER_RELATIONSHIP_UP });
      return dispatch(pushAndAdvanceDay());
    case SCRIPT_RELATIONSHIP_DOWN_END_DAY:
      dispatch({ type: PLAYER_RELATIONSHIP_DOWN });
      return dispatch(pushAndAdvanceDay());
    case SCRIPT_TEST_END_DAY:
      return dispatch(pushAndAdvanceDay());
    default:
      return dispatch({ type: SCREEN_NEXT, to: scriptId });
  }
};

export const setPlayerState = (name, day, relationship, relationshipDelta) =>
  async (dispatch) => {
    dispatch({ type: PLAYER_SET, name, day, relationship, relationshipDelta });
    dispatch({ type: SCREEN_NEXT, to: scriptIdForDay(day) });
  };
