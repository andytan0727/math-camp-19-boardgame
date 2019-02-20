import {
  START_GAME,
  INITIALIZE_DATA,
  UPDATE_DATA,
  NEXT_GAME,
  SET_GAME,
  TOGGLE_BEGIN_CURRENT_GAME,
  RESTORE_GAME
} from "../../utils/constants/actionTypes";

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
  // gameData: Array<IScoresAll>;
  gameData: Array<number>;
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
    data: Array<number>;
  };
}

interface UpdateDataAction {
  type: typeof UPDATE_DATA;
  payload: {
    data: Array<number>;
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
      gameData: Array<number>;
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
