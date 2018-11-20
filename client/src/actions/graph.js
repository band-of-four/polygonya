import { GRAPH_ADD_POINT, GRAPH_RESET, GRAPH_SET_FIELD,
  GRAPH_FIELD_VALID_RANGES } from '../reducers/graph.js';
import { SCREEN_GRAPH_AWAIT,
  SCREEN_GRAPH_INSIDE, SCREEN_GRAPH_OUTSIDE,
  SCREEN_GRAPH_ERROR, SCREEN_GRAPH_INVALID_FIELD,
  SCREEN_GRAPH, SCREEN_GRAPH_END } from '../reducers/screen.js';
import { withDelay, postJson } from '../utils.js';

const GRAPH_POINTS_INSIDE_REQUIRED = 3;

export const resetGraph = () => ({ type: GRAPH_RESET });

export const setField = (field, rawValue) => async (dispatch) => {
  const value = parseFloat(rawValue);
  const { min, max } = GRAPH_FIELD_VALID_RANGES[field];

  if (isNaN(value) || value < min || value > max) {
    dispatch({ type: SCREEN_GRAPH_INVALID_FIELD, field, min, max });
    return false;
  }

  dispatch({ type: SCREEN_GRAPH }); // clear errors if any
  dispatch({ type: GRAPH_SET_FIELD, field, value });
  return true;
}

export const addPointByXY = (x, y) => async (dispatch, getState) => {
  await dispatch(setField('x', x)) &&
    await dispatch(setField('y', y)) &&
    await dispatch(addPoint());
}

export const addPoint = () => async (dispatch, getState) => {
  const { x, y, r } = getState().graph;

  try {
    dispatch({ type: SCREEN_GRAPH_AWAIT });

    const request = await withDelay(900, postJson('/graph/check', { x, y, r }));

    if (request.status !== 200) throw '';

    const inside = await request.text() === "true";

    dispatch({ type: GRAPH_ADD_POINT, result: { x, y, inside } });

    const numPointsInside =
      getState().graph.points.filter(({ inside }) => inside).length;

    if (numPointsInside === GRAPH_POINTS_INSIDE_REQUIRED)
      dispatch({ type: SCREEN_GRAPH_END });
    else if (numPointsInside < GRAPH_POINTS_INSIDE_REQUIRED)
      dispatch({ type: inside ? SCREEN_GRAPH_INSIDE : SCREEN_GRAPH_OUTSIDE });
  }
  catch (e) {
    dispatch({ type: SCREEN_GRAPH_ERROR });
    return false;
  }
  return true;
}
