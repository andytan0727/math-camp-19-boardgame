import {
  START_GAME,
  INITIALIZE_DATA,
  UPDATE_DATA,
  NEXT_GAME,
  SET_GAME
} from "../../utils/constants/actionTypes";

import { IScoresAll } from "../player/types";

/**
 * Game states
 */

export interface IGameState {
  startGame: boolean;
  currentGame: number;
  gameData: Array<IScoresAll>;
}

/**
 * Game actions
 */
interface StartGameAction {
  type: typeof START_GAME;
}

interface NextGameAction {
  type: typeof NEXT_GAME;
}

interface InitializeDataAction {
  type: typeof INITIALIZE_DATA;
  payload: {
    data: Array<IScoresAll>;
  };
}

interface UpdateDataAction {
  type: typeof UPDATE_DATA;
  payload: {
    data: Array<IScoresAll>;
  };
}

interface SetGameAction {
  type: typeof SET_GAME;
  payload: {
    game: number;
  };
}

export type GameAction = StartGameAction &
  NextGameAction &
  InitializeDataAction &
  UpdateDataAction &
  SetGameAction;
