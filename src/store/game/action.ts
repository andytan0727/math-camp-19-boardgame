import {
  START_GAME,
  NEXT_GAME,
  INITIALIZE_DATA,
  UPDATE_DATA
} from "../../utils/constants/actionTypes";

// Interfaces
import { IAllPlayersGameScore } from "./types";

export const startGame = () => {
  return {
    type: START_GAME
  };
};

export const nextGame = () => {
  return {
    type: NEXT_GAME
  };
};

export const initializeData = (data: Array<IAllPlayersGameScore>) => {
  return {
    type: INITIALIZE_DATA,
    payload: {
      data
    }
  };
};

export const updateData = (data: Array<IAllPlayersGameScore>) => {
  return {
    type: UPDATE_DATA,
    payload: {
      data
    }
  };
};
