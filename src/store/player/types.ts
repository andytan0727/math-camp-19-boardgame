import {
  ADD_NEW_PLAYER,
  ADD_FILE,
  MOVE_PLAYER,
  CHANGE_PLAYER
} from "../../utils/constants/actionTypes";

/**
 * Player states
 */
export interface ISinglePlayerObj {
  id: number;
  pos: string;
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

interface AddFileAction {
  type: typeof ADD_FILE;
  payload: {
    data: Array<IScoresAll>;
  };
}

interface MovePlayerAction {
  type: typeof MOVE_PLAYER;
  payload: {
    newPos: number;
  };
}

interface ChangePlayerAction {
  type: typeof CHANGE_PLAYER;
}

export type PlayerActions = AddNewPlayerAction &
  AddFileAction &
  MovePlayerAction &
  ChangePlayerAction;
