import { GRAPH_ADD_POINT, GRAPH_RESET, GRAPH_SET_FIELD, GRAPH_SET_POINTS,
  GRAPH_FIELD_VALID_RANGES } from '../reducers/graph.js';
import { SCREEN_GRAPH_INSIDE, SCREEN_GRAPH_OUTSIDE,
  SCREEN_GRAPH_ERROR, SCREEN_GRAPH_INVALID_FIELD,
  SCREEN_GRAPH, SCREEN_GRAPH_END } from '../reducers/screen.js';
import { delay } from '../utils.js';

const GRAPH_POINTS_INSIDE_REQUIRED = 3;

export const resetGraph = () => ({ type: GRAPH_RESET });

export const finishGraph = () => ({ type: SCREEN_GRAPH_END });

const areaCheck = (r, x, y) =>
  (x < 0 && y < 0) ? (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= r)
    : (x <= 0 && y >= 0) ? (-x <= r && y <= r / 2)
    : (x >= 0 && y > 0) ? (x <= (r / 2 - y))
    : false;

export const setField = (field, rawValue) => async (dispatch, getState) => {
  const value = parseFloat(rawValue);
  const { min, max } = GRAPH_FIELD_VALID_RANGES[field];

  if (isNaN(value) || value < min || value > max) {
    dispatch({ type: SCREEN_GRAPH_INVALID_FIELD, field, min, max });
    return false;
  }

  if (field === 'r') {
    const points = getState().graph.points.map(({ x, y }) =>
      ({ r: value, x, y, inside: areaCheck(value, x, y) }));

    dispatch({ type: GRAPH_SET_POINTS, points });

    const numPointsInside = points.filter(({ inside }) => inside).length;
    if (numPointsInside >= GRAPH_POINTS_INSIDE_REQUIRED) {
      dispatch({ type: GRAPH_SET_FIELD, field: 'r', value });
      await delay(900);
      return 'finished';
    }
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
  const { r, x, y } = getState().graph;
  const inside = areaCheck(r, x, y);

  dispatch({ type: GRAPH_ADD_POINT, point: { r, x, y, inside } });

  const numPointsInside =
    getState().graph.points.filter(({ inside }) => inside).length;

  if (numPointsInside >= GRAPH_POINTS_INSIDE_REQUIRED)
    return true;

  dispatch({ type: inside ? SCREEN_GRAPH_INSIDE : SCREEN_GRAPH_OUTSIDE });
  return false;
}
