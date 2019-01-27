import produce from 'immer';

import {
  START_GAME,
  GAME_STARTED,
  INITIALIZE_DATA,
  UPDATE_DATA,
  NEXT_GAME
} from "../../utils/constants/actionTypes";

// Interfaces
import { IGameState, GameAction } from "./types";

const initialState: IGameState = {
  status: "0",
  currentGame: 1,
  game: []
};

export const game = produce((draft, action: GameAction) => {
  switch (action.type) {
    case START_GAME:
      draft.status = GAME_STARTED
      return draft;

    case INITIALIZE_DATA:
      draft.game = [...action.payload.data];
      return draft;

    case UPDATE_DATA:
      draft.game = [...action.payload.data];
      return draft;

    case NEXT_GAME:
      draft.currentGame++;
      return draft;

    default:
      return draft;
  }
}, initialState);
