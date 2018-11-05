import { SCREEN_NEXT } from '../reducers/screen.js';

export const nextScreen = (stateId) => ({ type: SCREEN_NEXT, to: stateId });

export function finishDay() {
  console.log('Not implemented');
  return { type: undefined };
}
