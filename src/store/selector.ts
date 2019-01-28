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
// From game states
const currentGame = (state: AppState) => state.game.currentGame;
const gameData = (state: AppState) => state.game.gameData;

// From players states
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
export const getCurrentGame = createSelector(
  currentGame,
  curGame => curGame
);

export const getCurrentGameData = createDeepEqualSelector(
  [currentGame, gameData],
  (curGame, data) => data[curGame - 1]
);

export const getCurrentPlayerScore = createSelector(
  [currentGame, currentPlayer],
  (curGame, curPlayer) =>
    curPlayer.game[curGame - 1] && curPlayer.game[curGame - 1].score
);
