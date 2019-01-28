// Constants
import {
  ADD_NEW_PLAYER,
  ADD_FILE,
  MOVE_PLAYER,
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

export const addFile = (data: Array<IScoresAll>) => {
  return {
    type: ADD_FILE,
    payload: {
      data
    }
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

export const changePlayer = () => {
  return {
    type: CHANGE_PLAYER
  };
};

export const updateCurrentGameScore = (curGame: number, data: IScoresAll, backupData?: Array<IScoresAll>) => {
  return {
    type: UPDATE_CURRENT_GAME_SCORE,
    payload: {
      curGame,
      data,
      backupData
    }
  };
};
