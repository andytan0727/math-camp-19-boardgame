import produce from "immer";

import {
  START_GAME,
  INITIALIZE_DATA,
  UPDATE_DATA,
  NEXT_GAME,
  SET_GAME,
  TOGGLE_BEGIN_CURRENT_GAME,
  RESTORE_GAME
} from "../../utils/constants/actionTypes";

// Interfaces
import { IGameState, GameAction } from "./types";

const initialState: IGameState = {
  startGame: true,
  currentGame: 1,
  beginCurrentGame: false,
  gameData: [],
  bonusPos: {
    x2: [
      {
        id: 1,
        pos: 20
      },
      {
        id: 2,
        pos: 40
      },
      {
        id: 3,
        pos: 66
      }
    ],
    x4: [
      {
        id: 1,
        pos: 30
      },
      {
        id: 2,
        pos: 50
      },
      {
        id: 3,
        pos: 85
      }
    ]
  }
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

    case RESTORE_GAME:
      draft.currentGame = action.payload.game.currentGame;
      draft.gameData = action.payload.game.gameData;
      return draft;

    default:
      return draft;
  }
}, initialState);
