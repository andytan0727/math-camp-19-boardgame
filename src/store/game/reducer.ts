import produce from "immer";

import {
  START_GAME,
  GAME_STARTED,
  INITIALIZE_DATA,
  UPDATE_DATA,
  NEXT_GAME,
  SET_GAME
} from "../../utils/constants/actionTypes";

// Interfaces
import { IGameState, GameAction } from "./types";

const initialState: IGameState = {
  status: "0",
  currentGame: 1,
  gameData: []
};

export const game = produce((draft, action: GameAction) => {
  switch (action.type) {
    case START_GAME:
      draft.status = GAME_STARTED;
      return draft;

    case INITIALIZE_DATA:
      draft.gameData = [...action.payload.data];
      return draft;

    case UPDATE_DATA:
      draft.gameData = [...action.payload.data];
      return draft;

    case NEXT_GAME:
      draft.currentGame++;
      return draft;

    case SET_GAME:
      console.log(`Inside reducer, ${action.payload.game}`);
      draft.currentGame = action.payload.game;
      return draft;

    default:
      return draft;
  }
}, initialState);
