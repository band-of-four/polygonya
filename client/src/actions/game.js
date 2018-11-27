import { SCREEN_NEXT, SCREEN_GRAPH } from '../reducers/screen.js';
import { APP_UI_CREDITS } from '../reducers/app.js';
import { PLAYER_RELATIONSHIP_UP, PLAYER_RELATIONSHIP_DOWN,
  PLAYER_TEST_DONE, PLAYER_SET } from '../reducers/player.js';
import { SCRIPT_RELATIONSHIP_UP_END_DAY, SCRIPT_RELATIONSHIP_DOWN_END_DAY,
  SCRIPT_RELATIONSHIP_NONE_END_DAY, SCRIPT_TEST_END_DAY,
  SCRIPT_GRAPH, SCRIPT_END, scriptIdForDay } from '../script.js';
import { advanceDayAndSave } from './app.js';

export const nextScreen = (scriptId) => async (dispatch) => {
  switch (scriptId) {
    case SCRIPT_RELATIONSHIP_UP_END_DAY:
      dispatch({ type: PLAYER_RELATIONSHIP_UP });
      return dispatch(advanceDayAndSave());
    case SCRIPT_RELATIONSHIP_DOWN_END_DAY:
      dispatch({ type: PLAYER_RELATIONSHIP_DOWN });
      return dispatch(advanceDayAndSave());
    case SCRIPT_RELATIONSHIP_NONE_END_DAY:
      return dispatch(advanceDayAndSave());
    case SCRIPT_TEST_END_DAY:
      dispatch({ type: PLAYER_TEST_DONE });
      return dispatch(advanceDayAndSave());
    case SCRIPT_END:
      return dispatch({ type: APP_UI_CREDITS });
    default:
      return dispatch({ type: SCREEN_NEXT, to: scriptId });
  }
};

export const setPlayerState = (name, day, relationship, relationshipDelta, testsDone) =>
  async (dispatch) => {
    dispatch({ type: PLAYER_SET, name, day, relationship, relationshipDelta, testsDone });
    dispatch({ type: SCREEN_NEXT, to: scriptIdForDay(day) });
  };
