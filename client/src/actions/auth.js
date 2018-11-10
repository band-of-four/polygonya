//import { CHAN_LOGIN_AWAIT, CHAN_LOGIN_OK, CHAN_LOGIN_ERR } from '../reducers/chan.js';
import { withDelay, postJson } from '../utils.js';
import { pull } from './game.js';

export const login = (username, password) => async (dispatch) => {
  try {
    //dispatch({ type: CHAN_LOGIN_AWAIT, username });

    const authRequest = await withDelay(900,
      postJson('/auth/login', { username, password }));

    if (authRequest.status === 200) {
      dispatch(pull(username));     
    }
    else throw '';
  }
  catch (e) {
    dispatch({ type: CHAN_LOGIN_ERR });
    return false;
  }
  return true;
}
