import { CHAN_LOGIN_AWAIT, CHAN_LOGIN_OK, CHAN_LOGIN_ERR } from '../reducers/chan.js';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: CHAN_LOGIN_AWAIT, username });

    const resultDelayMillis = 900;
    const fetchStartMillis = Date.now();

    let authRequest = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const delay = fetchStartMillis + resultDelayMillis - Date.now();
    if (delay > 0) await new Promise((resolve) => setTimeout(() => resolve(), delay));

    if (authRequest.status === 200) {
      dispatch({ type: CHAN_LOGIN_OK });
    }
    else throw '';
  }
  catch (e) {
    dispatch({ type: CHAN_LOGIN_ERR });
  }
}
