export const LOGIN_AWAIT = "LOGIN_AWAIT";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_AWAIT });
    let resp = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    let json = await resp.json();
    console.log(json);
  }
  catch (e) {
    dispatch({ type: LOGIN_ERROR });
  }
}
