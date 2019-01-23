import { ADD_NEW_PLAYER } from "../../utils/constants/actionTypes";

/**
 * Player states
 */
export interface ISinglePlayerObj {
  id: number;
  pos: string;
  color: string;
  score: number;
  path: number[];
  boxPosition: number;
}

export interface IPlayers {
  count: number;
  current: ISinglePlayerObj;
  all: Array<ISinglePlayerObj>;
}

/**
 * Player actions
 */
export interface AddNewPlayerAction {
  type: typeof ADD_NEW_PLAYER;
}