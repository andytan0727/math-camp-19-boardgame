// Constants
import {
  ADD_NEW_PLAYER,
  ADD_FILE,
  MOVE_PLAYER,
  CHANGE_PLAYER
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

export const movePlayer = (newPos: number) => {
  return {
    type: MOVE_PLAYER,
    payload: {
      newPos
    }
  };
};

export const changePlayer = () => {
  return {
    type: CHANGE_PLAYER
  };
};
