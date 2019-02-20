import {
  ADD_NEW_PLAYER,
  MOVE_ONCE_PER_PLAYER,
  CHANGE_PLAYER,
  UPDATE_CURRENT_GAME_SCORE,
  RESTORE_PLAYERS
} from "../../utils/constants/actionTypes";

/**
 * Player states
 */
export interface ISinglePlayerObj {
  id: number;
  name: string;
  pos: number;
  color: string;
  game: Array<number>;
  path: Array<number>;
}

export interface ISinglePlayerData {
  id: number;
  game: Array<number>;
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

interface MoveOncePerPlayerAction {
  type: typeof MOVE_ONCE_PER_PLAYER;
}

interface ChangePlayerAction {
  type: typeof CHANGE_PLAYER;
}

interface UpdateCurrentGameScoreAction {
  type: typeof UPDATE_CURRENT_GAME_SCORE;
  payload: {
    data: Array<number>;
  };
}

interface RestorePlayersAction {
  type: typeof RESTORE_PLAYERS;
  payload: {
    players: {
      current: ISinglePlayerObj;
      all: Array<ISinglePlayerObj>;
    };
  };
}

export type PlayerActions = AddNewPlayerAction &
  MoveOncePerPlayerAction &
  ChangePlayerAction &
  UpdateCurrentGameScoreAction &
  RestorePlayersAction;
