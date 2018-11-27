import { APP_UI_AWAIT, APP_UI_FETCH_ERROR, APP_UI_AUTH, APP_UI_GAME, APP_UI_HISTORY } from '../reducers/app.js';
import { setPlayerState } from './game.js';
import { resetGraph } from './graph.js';
import { delay } from '../utils.js';

const STORAGE_KEY = 'state';

export const loadPlayerState = () => async (dispatch) => {
  try {
    const state = localStorage.getItem(STORAGE_KEY);
    if (!state) return dispatch({ type: APP_UI_AUTH });

    await delay(1200); // simulate a server connection

    const { name, day, relationship, relationshipDelta, testsDone } = JSON.parse(state);

    dispatch(setPlayerState(name, day, relationship, relationshipDelta, testsDone));
    dispatch({ type: APP_UI_GAME });
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
};

export const advanceDayAndSave = () => async (dispatch, getState) => {
  const { name, day, relationship, relationshipDelta } = getState().player;
  const dayHistory = getState().graph.points;
  const testsDone = getState().player.testsDone;
  dispatch(resetGraph());

  /* Transition between days */
  await delay(2500);

  try {
    const oldHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)).history;

    const history = (dayHistory.length > 0) ? { ...oldHistory, [day]: dayHistory } : oldHistory;

    const state = { name, day: day + 1, relationship, relationshipDelta, testsDone, history };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    dispatch(setPlayerState(name, day + 1, relationship, relationshipDelta, testsDone));
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
};

export const createPlayer = (name) => async (dispatch) => {
  try {
    dispatch({ type: APP_UI_AWAIT });

    await delay(1200); // simulate a server connection

    const state = { name, day: 1, relationship: 0, relationshipDelta: 0, testsDone: 0, history: [] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    dispatch(setPlayerState(name, 1, 0, 0, 0));
    dispatch({ type: APP_UI_GAME });
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
};

export const erasePlayerState = () => async (dispatch) => {
  localStorage.removeItem(STORAGE_KEY);
  dispatch({ type: APP_UI_AUTH });
};

export const history = () => async (dispatch) => {
  try {
    dispatch({ type: APP_UI_AWAIT });

    await delay(1200); // simulate a server connection

    const { history } = JSON.parse(localStorage.getItem(STORAGE_KEY));

    dispatch({ type: APP_UI_HISTORY, history });
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
};
