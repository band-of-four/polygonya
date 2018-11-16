export const APP_UI_GAME = 'APP_UI_GAME';
export const APP_UI_AWAIT = 'APP_UI_AWAIT';
export const APP_UI_AUTH = 'APP_UI_AUTH';
export const APP_UI_FETCH_ERROR = 'APP_FETCH_ERROR';

export const APP_AUTH_NAME_TAKEN = 'APP_AUTH_NAME_TAKEN';
export const APP_AUTH_INVALID_CREDS = 'APP_AUTH_INVALID_CREDS';

const defaultState = {
  ui: APP_UI_AWAIT
};

export default function app(state = defaultState, action) {
  switch (action.type) {
    case APP_UI_GAME:
      return { ui: APP_UI_GAME };
    case APP_UI_AUTH:
      return { ui: APP_UI_AUTH };
    case APP_UI_AWAIT:
      return { ui: APP_UI_AWAIT };
    case APP_UI_FETCH_ERROR:
      return { ui: APP_UI_FETCH_ERROR };
    case APP_AUTH_NAME_TAKEN:
      return { ui: APP_UI_AUTH, authError: APP_AUTH_NAME_TAKEN };
    case APP_AUTH_INVALID_CREDS:
      return { ui: APP_UI_AUTH, authError: APP_AUTH_INVALID_CREDS };
    default:
      return state;
  }
}
