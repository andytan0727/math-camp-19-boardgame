import { START_GAME } from "../../utils/constants/actionTypes";

/**
 * Game states
 */
export interface IGameState {
  gameNum: string;
}

/**
 * Game actions
 */
export interface StartGameAction {
  type: typeof START_GAME;
}
