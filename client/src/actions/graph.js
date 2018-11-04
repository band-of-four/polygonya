import { GRAPH_ADD_POINT } from '../reducers/graph.js';
import { GAME_GRAPH_AWAIT, GAME_GRAPH_INSIDE, GAME_GRAPH_OUTSIDE,
  GAME_GRAPH_ERROR, GAME_GRAPH_INVALID_FIELD, GAME_GRAPH_RESET } from '../reducers/game.js';
import { finishDay } from '../actions/game.js';
import { withDelay, postJson } from '../utils.js';

const GRAPH_POINTS_INSIDE_REQUIRED = 3;

export const resetErrors = () => ({
  type: GAME_GRAPH_RESET
});

export const fieldError = (field, min, max) => ({
  type: GAME_GRAPH_INVALID_FIELD, field, min, max
});

export const addPoint = (x, y, r) => async (dispatch, getState) => {
  try {
    dispatch({ type: GAME_GRAPH_AWAIT });

    const request = await withDelay(900, postJson('/graph/check', { x, y, r }));

    if (request.status !== 200) throw '';

    const inside = await request.text() === "true";

    dispatch({ type: GRAPH_ADD_POINT, result: { x, y, inside } });

    const numPointsInside =
      getState().graph.points.filter(({ inside }) => inside).length;

    if (numPointsInside === GRAPH_POINTS_INSIDE_REQUIRED)
      dispatch(finishDay());
    else
      dispatch({ type: inside ? GAME_GRAPH_INSIDE : GAME_GRAPH_OUTSIDE });
  }
  catch (e) {
    dispatch({ type: GAME_GRAPH_ERROR });
    return false;
  }
  return true;
}
