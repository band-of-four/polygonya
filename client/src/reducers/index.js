import { combineReducers } from 'redux';

import game from './game.js';
import graph from './graph.js';

export default combineReducers({ game, graph })
