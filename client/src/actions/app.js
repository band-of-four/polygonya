import { APP_UI_AWAIT, APP_UI_FETCH_ERROR,
  APP_UI_AUTH, APP_UI_GAME,
  APP_AUTH_INVALID_CREDS, APP_AUTH_NAME_TAKEN } from '../reducers/app.js';
import { setPlayerState } from './game.js';
import { withDelay, postJson, get, httpDelete } from '../utils.js';

export const tryPull = () => async (dispatch) => {
  try {
    const nameRequest = await get('/auth/identity');
    if (nameRequest.status === 401) return dispatch({ type: APP_UI_AUTH });
    if (nameRequest.status !== 200) throw '';
    const name = await nameRequest.text();

    const syncRequest = await get('/sync/info');
    if (syncRequest.status !== 200) throw '';
    const { day, relationship, relationshipDelta } = await syncRequest.json();

    dispatch(setPlayerState(name, day, relationship, relationshipDelta));
    dispatch({ type: APP_UI_GAME });
  }
  catch (e) {
    dispatch({ type: APP_UI_FETCH_ERROR });
  }
};

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
