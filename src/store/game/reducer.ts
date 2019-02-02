import produce from "immer";

import {
  START_GAME,
  INITIALIZE_DATA,
  UPDATE_DATA,
  NEXT_GAME,
  SET_GAME,
  TOGGLE_BEGIN_CURRENT_GAME
} from "../../utils/constants/actionTypes";

// Interfaces
import { IGameState, GameAction } from "./types";

const initialState: IGameState = {
  startGame: true,
  currentGame: 1,
  beginCurrentGame: false,
  gameData: []
};

export const game = produce((draft, action: GameAction) => {
  switch (action.type) {
    case START_GAME:
      draft.startGame = !draft.startGame;
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
      draft.currentGame = action.payload.game;
      return draft;

    case TOGGLE_BEGIN_CURRENT_GAME:
      draft.beginCurrentGame = !draft.beginCurrentGame;
      return draft;

    default:
      return draft;
  }
}, initialState);
