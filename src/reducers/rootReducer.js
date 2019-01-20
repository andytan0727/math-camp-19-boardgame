import { combineReducers } from 'redux';
import { game } from './gameReducer'
import { players } from './playerReducer';

export default combineReducers({
  game,
  players
});