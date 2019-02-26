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

const bonusPosArr = {
  x2PosArr: [
    23,
    27,
    30,
    34,
    52,
    56,
    58,
    65,
    68,
    73,
    78,
    81,
    91,
    93,
    99,
    108,
    111,
    118,
    121,
    125,
    129,
    132,
    135,
    138,
    140,
    149,
    153,
    155,
    160,
    165,
    169,
    173,
    175,
    179,
    184,
    198,
    204,
    209,
    211,
    213,
    215,
    219,
    226,
    231,
    233,
    235,
    238,
    241,
    251,
    254,
    259,
    274
  ],
  x4PosArr: [41, 44, 48, 62, 63, 96, 143, 151, 171, 189, 190, 191, 201]
};

const initialState: IGameState = {
  startGame: true,
  currentGame: 1,
  beginCurrentGame: false,
  gameData: [],
  bonusPos: {
    x2: Array.from(
      { length: bonusPosArr.x2PosArr.length },
      (_, idx) => idx
    ).map(val => ({ id: val + 1, pos: bonusPosArr.x2PosArr[val] })),
    x4: Array.from(
      { length: bonusPosArr.x4PosArr.length },
      (_, idx) => idx
    ).map(val => ({ id: val + 1, pos: bonusPosArr.x4PosArr[val] }))
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
