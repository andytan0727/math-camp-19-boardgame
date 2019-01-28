import {
  createSelectorCreator,
  defaultMemoize,
  createSelector
} from "reselect";
import { isEqual } from "lodash";
import { AppState } from "./index";

// Create a "deep equal selector" that uses lodash.isEqual instead of default ===
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

/**
 * ---------------------------------------------
 * Selectors direct to Redux store
 */
// From board states
const layout = (state: AppState) => state.board.layout;
const gridWidth = (state: AppState) => state.board.grid.width;
const gridHeight = (state: AppState) => state.board.grid.height;
const boxWidth = (state: AppState) => state.board.box.width;
const boxHeight = (state: AppState) => state.board.box.height;

// From game states
const currentGame = (state: AppState) => state.game.currentGame;
const gameData = (state: AppState) => state.game.gameData;

// From players states
const count = (state: AppState) => state.players.count;
const allPlayer = (state: AppState) => state.players.all;
const currentPlayer = (state: AppState) => state.players.current;
// ---------------------------------------------

/**
 * Composing selectors
 *
 * Using deep equal selector for selecting arrays and objects
 * to prevent unnecessary recomputation,
 * using default === strict equality check for selecting primitive types
 *
 */
export const getCurrentLayout = createDeepEqualSelector(
  layout,
  curLayout => curLayout
);

export const getGridDimensions = createSelector(
  [gridWidth, gridHeight],
  (gWidth, gHeight) => ({ width: gWidth, height: gHeight })
);

export const getBoxDimensions = createSelector(
  [boxWidth, boxHeight],
  (bWidth, bHeight) => ({ width: bWidth, height: bHeight })
);

export const getCurrentGame = createSelector(
  currentGame,
  curGame => curGame
);

export const getCurrentGameData = createDeepEqualSelector(
  [currentGame, gameData],
  (curGame, data) => data[curGame - 1]
);

export const getCount = createSelector(
  count,
  c => c
);

export const getAllPlayers = createDeepEqualSelector(allPlayer, all => all);

export const getCurrentPlayer = createDeepEqualSelector(
  currentPlayer,
  curPlayer => curPlayer
);

export const getCurrentPlayerScore = createSelector(
  [getCurrentGame, getCurrentPlayer],
  (curGame, curPlayer) =>
    curPlayer.game[curGame - 1] && curPlayer.game[curGame - 1].score
);
