import { GRAPH_ADD_POINT } from '../reducers/graph.js';
import { SCREEN_GRAPH_AWAIT, SCREEN_GRAPH_INSIDE, SCREEN_GRAPH_OUTSIDE,
  SCREEN_GRAPH_ERROR, SCREEN_GRAPH_INVALID_FIELD, SCREEN_GRAPH_RESET } from '../reducers/screen.js';
import { finishDay } from '../actions/screen.js';
import { withDelay, postJson } from '../utils.js';

const GRAPH_POINTS_INSIDE_REQUIRED = 3;

export const resetErrors = () => ({
  type: SCREEN_GRAPH_RESET
});

export const fieldError = (field, min, max) => ({
  type: SCREEN_GRAPH_INVALID_FIELD, field, min, max
});

export const addPoint = (x, y, r) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCREEN_GRAPH_AWAIT });

    const request = await withDelay(900, postJson('/graph/check', { x, y, r }));

    if (request.status !== 200) throw '';

    const inside = await request.text() === "true";

    dispatch({ type: GRAPH_ADD_POINT, result: { x, y, inside } });

    const numPointsInside =
      getState().graph.points.filter(({ inside }) => inside).length;

    if (numPointsInside === GRAPH_POINTS_INSIDE_REQUIRED)
      dispatch(finishDay());
    else
      dispatch({ type: inside ? SCREEN_GRAPH_INSIDE : SCREEN_GRAPH_OUTSIDE });
  }
  catch (e) {
    dispatch({ type: SCREEN_GRAPH_ERROR });
    return false;
  }
  return true;
}
