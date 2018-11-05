import { combineReducers } from 'redux';

import screen from './screen.js';
import player from './player.js';
import graph from './graph.js';

export default combineReducers({ screen, player, graph });
