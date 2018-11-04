import { GAME_ADVANCE } from '../reducers/game.js';

export const nextState = (stateId) => ({ type: GAME_ADVANCE, to: stateId });

export function finishDay() {
  console.log('Not implemented');
  return { type: undefined };
}
