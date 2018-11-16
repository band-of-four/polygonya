import { combineReducers } from 'redux';

import screen from './screen.js';
import player from './player.js';
import graph from './graph.js';
import app from './app.js';

export default combineReducers({ screen, player, graph, app });
