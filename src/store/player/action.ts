// Constants
import {
  ADD_NEW_PLAYER,
  MOVE_PLAYER,
  MOVE_ONCE_PER_PLAYER,
  CHECK_BONUS_SCORE,
  CHANGE_PLAYER,
  UPDATE_CURRENT_GAME_SCORE,
  RESTORE_PLAYERS
} from "../../utils/constants/actionTypes";
import { IScoresAll, ISinglePlayerObj } from "./types";

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

export const checkBonusScore = (
  curGame: number,
  x2Pos: Array<number>,
  x4Pos: Array<number>
) => {
  return {
    type: CHECK_BONUS_SCORE,
    payload: {
      curGame,
      pos: {
        x2Pos,
        x4Pos
      }
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
