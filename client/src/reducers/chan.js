export const CHAN_LOGIN_AWAIT = "CHAN_LOGIN_AWAIT";
export const CHAN_LOGIN_OK = "CHAN_LOGIN_OK";
export const CHAN_LOGIN_ERR = "CHAN_LOGIN_ERR";

const IDLE = 'kaiki-chan-idle.png';
const THINKING = 'kaiki-chan-thinking.png';

const defaultState = {
  sprite: IDLE, quote: '...'
}

export default function chan(state = defaultState, action) {
  switch (action.type) {
    case CHAN_LOGIN_AWAIT:
      return {
        sprite: THINKING,
        quote: `Хмм, ${action.username}? Дай вспомнить...`
      };
    case CHAN_LOGIN_OK:
      return {
        sprite: IDLE,
        quote: `Ах, опять ты? Неужели ты опять не можешь справиться без моей помощи?`
      };
    case CHAN_LOGIN_ERR:
      return {
        sprite: IDLE,
        quote: `Ты уверен, что мы знакомы? Проверь свой пароль.`
      };
    default:
      return state
  }
}
