import {
  START_GAME,
  INITIALIZE_DATA,
  UPDATE_DATA,
  NEXT_GAME
} from "../../utils/constants/actionTypes";

/**
 * Game states
 */
export interface IAllPlayersGameScore {
  score: number[];
  extra: number[];
}

export interface IGameState {
  status: string;
  currentGame: number;
  game: Array<IAllPlayersGameScore>;
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
    data: Array<IAllPlayersGameScore>;
  };
}

interface UpdateDataAction {
  type: typeof UPDATE_DATA;
  payload: {
    data: Array<IAllPlayersGameScore>;
  };
}

export type GameAction = StartGameAction &
  NextGameAction &
  InitializeDataAction &
  UpdateDataAction;
