import { combineReducers } from 'redux';
import { board } from './boardReducer';
import { game } from './gameReducer'
import { players } from './playerReducer';

export default combineReducers({
  board,
  game,
  players
});