// Constants
import {
  ADD_NEW_PLAYER,
  MOVE_PLAYER,
  MOVE_ONCE_PER_PLAYER,
  CHANGE_PLAYER,
  UPDATE_CURRENT_GAME_SCORE
} from "../../utils/constants/actionTypes";
import { IScoresAll } from "./types";

// Actions
export const addNewPlayer = () => {
  return {
    type: ADD_NEW_PLAYER
  };
};

export const movePlayer = (curGame: number) => {
  return {
    type: MOVE_PLAYER,
    payload: {
      curGame
    }
  };
};

export const moveOncePerPlayer = (curGame: number, scoreType: string) => {
  return {
    type: MOVE_ONCE_PER_PLAYER,
    payload: {
      curGame,
      scoreType
    }
  };
};

export const changePlayer = () => {
  return {
    type: CHANGE_PLAYER
  };
};

export const updateCurrentGameScore = (
  curGame: number,
  data: Array<IScoresAll>
) => {
  return {
    type: UPDATE_CURRENT_GAME_SCORE,
    payload: {
      curGame,
      data
    }
  };
};
