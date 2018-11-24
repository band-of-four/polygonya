import { APP_UI_AWAIT, APP_UI_FETCH_ERROR,
  APP_UI_AUTH, APP_UI_GAME, APP_UI_HISTORY,
  APP_AUTH_INVALID_CREDS, APP_AUTH_NAME_TAKEN } from '../reducers/app.js';
import { setPlayerState } from './game.js';
import { resetGraph } from './graph.js';
import { withDelay, postJson, get, httpDelete } from '../utils.js';

async function sendPendingUpdates(username) {
  const failedUpdate = localStorage.getItem(`update-for-${username}`);
  if (failedUpdate === null) return;

  const request = await postJson('/sync/push', JSON.parse(failedUpdate));
  /* 422 indicates a stale update, which we just throw away */
  if (request.status !== 200 && request.status !== 422) throw '';

  localStorage.removeItem(`update-for-${username}`);
}

async function sendUpdate(username, newDay, relationshipDelta, history) {
  const update = { newDay, relationshipDelta, history };

  localStorage.setItem(`update-for-${username}`, JSON.stringify(update));

  const request = await postJson('/sync/push', update);
  if (request.status !== 200) throw '';

  localStorage.removeItem(`update-for-${username}`);
}

export const tryPull = () => async (dispatch) => {
  try {
    const nameRequest = await get('/auth/identity');
    if (nameRequest.status === 401) return dispatch({ type: APP_UI_AUTH });
    if (nameRequest.status !== 200) throw '';
    const name = await nameRequest.text();

    await sendPendingUpdates(name);

    const syncRequest = await get('/sync/pull');
    if (syncRequest.status !== 200) throw '';
    const { day, relationship, relationshipDelta } = await syncRequest.json();

    dispatch(setPlayerState(name, day, relationship, relationshipDelta));
    dispatch({ type: APP_UI_GAME });
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
};

export const pushAndAdvanceDay = () => async (dispatch, getState) => {
  const { name, day, relationship, relationshipDelta } = getState().player;
  const newDay = day + 1;
  const history = getState().graph.points;
  dispatch(resetGraph());

  try {
    sendUpdate(name, newDay, relationshipDelta, history);
    dispatch(setPlayerState(name, newDay, relationship, relationshipDelta));
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
}

export const resetAuthScreen = () => ({ type: APP_UI_AUTH });

export const login = (username, password) => async (dispatch) =>
  authRequest('/auth/login', username, password, dispatch);

export const signUp = (username, password) => async (dispatch) =>
  authRequest('/auth/signup', username, password, dispatch);

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: APP_UI_AWAIT });
    httpDelete('/auth/logout');
    dispatch({ type: APP_UI_AUTH });
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
}

export const history = () => async (dispatch) => {
  try {
    dispatch({ type: APP_UI_AWAIT });

    const request = await get('/sync/history');
    if (request.status !== 200) throw '';

    const history = await request.json();
    dispatch({ type: APP_UI_HISTORY, history });
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
};

async function authRequest(url, username, password, dispatch) {
  try {
    dispatch({ type: APP_UI_AWAIT });

    const request = await withDelay(900, postJson(url, { username, password }));
    if (request.status === 401)
      return dispatch({ type: APP_AUTH_INVALID_CREDS });
    if (request.status === 422) {
      const error = await request.text();
      if (error.startsWith('User name is already taken'))
        return dispatch({ type: APP_AUTH_NAME_TAKEN });
    }
    if (request.status !== 200) throw '';

    dispatch(tryPull());
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
}
