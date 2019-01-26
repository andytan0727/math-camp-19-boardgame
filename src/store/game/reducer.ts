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

export const game = (state = initialState, action: GameAction) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        status: GAME_STARTED
      };

    case INITIALIZE_DATA:
      return {
        ...state,
        game: [...action.payload.data]
      };

    case UPDATE_DATA:
      return {
        ...state,
        game: [...action.payload.data]
      };

    case NEXT_GAME:
      return {
        ...state,
        currentGame: state.currentGame + 1
      };

    default:
      return state;
  }
};
