// Constants
import {
  ADD_NEW_PLAYER,
  MOVE_ONCE_PER_PLAYER,
  CHANGE_PLAYER,
  UPDATE_CURRENT_GAME_SCORE,
  RESTORE_PLAYERS
} from "../../utils/constants/actionTypes";
import { ISinglePlayerObj } from "./types";

// Actions
export const addNewPlayer = () => {
  return {
    type: ADD_NEW_PLAYER
  };
};

export const moveOncePerPlayer = () => {
  return {
    type: MOVE_ONCE_PER_PLAYER
  };
};

export const changePlayer = () => {
  return {
    type: CHANGE_PLAYER
  };
};

export const updateCurrentGameScore = (data: Array<number>) => {
  return {
    type: UPDATE_CURRENT_GAME_SCORE,
    payload: {
      data
    }
  };
};

export const restorePlayers = (players: {
  current: ISinglePlayerObj;
  all: Array<ISinglePlayerObj>;
}) => {
  return {
    type: RESTORE_PLAYERS,
    payload: {
      players
    }
  };
};
