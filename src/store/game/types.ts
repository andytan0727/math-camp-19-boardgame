import {
  START_GAME,
  INITIALIZE_DATA,
  UPDATE_DATA,
  NEXT_GAME,
  SET_GAME,
  TOGGLE_BEGIN_CURRENT_GAME,
  RESTORE_GAME
} from "../../utils/constants/actionTypes";

import { IScoresAll } from "../player/types";

/**
 * Game states
 */

interface IPos {
  id: number;
  pos: number;
}

export interface IBonusPos {
  [key: string]: Array<IPos>;
}

export interface IGameState {
  startGame: boolean;
  currentGame: number;
  beginCurrentGame: boolean;
  gameData: Array<IScoresAll>;
  bonusPos: IBonusPos;
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

interface ToggleBeginCurrentGameAction {
  type: typeof TOGGLE_BEGIN_CURRENT_GAME;
}

interface RestoreGameAction {
  type: typeof RESTORE_GAME;
  payload: {
    game: {
      currentGame: number;
      gameData: Array<IScoresAll>;
    };
  };
}

export type GameAction = StartGameAction &
  NextGameAction &
  InitializeDataAction &
  UpdateDataAction &
  SetGameAction &
  ToggleBeginCurrentGameAction &
  RestoreGameAction;
