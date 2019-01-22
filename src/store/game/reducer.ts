import { START_GAME } from "../../utils/constants/actionTypes";

// Interfaces
import { IGameState, StartGameAction } from "./types";

const initialState: IGameState = {
  gameNum: "0"
};

export const game = (state = initialState, action: StartGameAction) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        gameNum: "game_1"
      };
    default:
      return state;
  }
};
