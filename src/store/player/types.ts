import {
  ADD_NEW_PLAYER,
  MOVE_PLAYER,
  MOVE_ONCE_PER_PLAYER,
  CHANGE_PLAYER,
  UPDATE_CURRENT_GAME_SCORE
} from "../../utils/constants/actionTypes";

/**
 * Player states
 */
export interface ISinglePlayerObj {
  id: number;
  pos: number;
  color: string;
  game: Array<IScores>;
  path: number[];
}

// -----------------------------------------
// Interfaces for processing data from external JSON file
export interface IScores {
  score: number;
  extra: number;
}

export interface IScoresAll {
  score: number[];
  extra: number[];
}

export interface ISinglePlayerData {
  id: number;
  game: Array<IScores>;
}

export interface IUpdatedData {
  current: ISinglePlayerData;
  all: Array<ISinglePlayerData>;
}
// -----------------------------------------

export interface IPlayers {
  count: number;
  current: ISinglePlayerObj;
  all: Array<ISinglePlayerObj>;
}

/**
 * Player actions
 */
interface AddNewPlayerAction {
  type: typeof ADD_NEW_PLAYER;
}

interface MovePlayerAction {
  type: typeof MOVE_PLAYER;
  payload: {
    curGame: number;
  };
}

interface MoveOncePerPlayerAction {
  type: typeof MOVE_ONCE_PER_PLAYER;
  payload: {
    curGame: number;
    scoreType: string;
  };
}

interface ChangePlayerAction {
  type: typeof CHANGE_PLAYER;
}

interface UpdateCurrentGameScoreAction {
  type: typeof UPDATE_CURRENT_GAME_SCORE;
  payload: {
    curGame: number;
    data: Array<IScoresAll>;
    // data: IScoresAll;
  };
}

export type PlayerActions = AddNewPlayerAction &
  MovePlayerAction &
  MoveOncePerPlayerAction &
  ChangePlayerAction &
  UpdateCurrentGameScoreAction;
