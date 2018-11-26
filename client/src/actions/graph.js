import { GRAPH_ADD_POINT, GRAPH_RESET, GRAPH_SET_FIELD, GRAPH_SET_POINTS,
  GRAPH_FIELD_VALID_RANGES } from '../reducers/graph.js';
import { SCREEN_GRAPH_AWAIT,
  SCREEN_GRAPH_INSIDE, SCREEN_GRAPH_OUTSIDE,
  SCREEN_GRAPH_ERROR, SCREEN_GRAPH_INVALID_FIELD,
  SCREEN_GRAPH, SCREEN_GRAPH_END } from '../reducers/screen.js';
import { withDelay, httpPost } from '../utils.js';

const GRAPH_POINTS_INSIDE_REQUIRED = 3;

export const resetGraph = () => ({ type: GRAPH_RESET });

export const finishGraph = () => ({ type: SCREEN_GRAPH_END });

export const setField = (field, rawValue) => async (dispatch, getState) => {
  const value = parseFloat(rawValue);
  const { min, max } = GRAPH_FIELD_VALID_RANGES[field];

  if (isNaN(value) || value < min || value > max) {
    dispatch({ type: SCREEN_GRAPH_INVALID_FIELD, field, min, max });
    return false;
  }

  if (field === 'r') try {
    dispatch({ type: SCREEN_GRAPH_AWAIT });

    const points = await withDelay(900,
      recomputePointsWithNewR(value, getState().graph.points));

    dispatch({ type: GRAPH_SET_POINTS, points });

    const numPointsInside = points.filter(({ inside }) => inside).length;
    if (numPointsInside === GRAPH_POINTS_INSIDE_REQUIRED) {
      dispatch({ type: GRAPH_SET_FIELD, field: 'r', value });

      return await withDelay(900, Promise.resolve('finished'));
    }
  }
  catch (e) {
    dispatch({ type: SCREEN_GRAPH_ERROR });
    return false;
  }

  dispatch({ type: SCREEN_GRAPH }); // clear errors if any
  dispatch({ type: GRAPH_SET_FIELD, field, value });

  return true;
}

export const addPointByXY = (x, y) => async (dispatch, getState) =>
  await dispatch(setField('x', x)) &&
    await dispatch(setField('y', y)) &&
    await dispatch(addPoint());

export const addPoint = () => async (dispatch, getState) => {
  const { x, y, r } = getState().graph;

  try {
    dispatch({ type: SCREEN_GRAPH_AWAIT });

    const request = await withDelay(900, httpPost('/graph/check', { x, y, r }));

    if (request.status !== 200) throw '';

    const inside = await request.text() === "true";

    dispatch({ type: GRAPH_ADD_POINT, result: { x, y, inside } });

    const numPointsInside =
      getState().graph.points.filter(({ inside }) => inside).length;

    if (numPointsInside === GRAPH_POINTS_INSIDE_REQUIRED)
      return true;
    else if (numPointsInside < GRAPH_POINTS_INSIDE_REQUIRED)
      dispatch({ type: inside ? SCREEN_GRAPH_INSIDE : SCREEN_GRAPH_OUTSIDE });
  }
  catch (e) {
    dispatch({ type: SCREEN_GRAPH_ERROR });
  }
  return false;
}

async function recomputePointsWithNewR(r, points) {
  const checkPayload = points.map(({ x, y }) => ({ x, y, r }));
  const request = await httpPost('/graph/bulkcheck', checkPayload);
  const newPoints = await request.json();

  for (let i = 0; i < points.length; i++) points[i].inside = newPoints[i];
  return points;
}
