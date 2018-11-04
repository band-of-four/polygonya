import { combineReducers } from 'redux';

import chan from './chan.js';
import game from './game.js';

export default combineReducers({ chan, game })
