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
const boardScale = (state: AppState) => state.board.scale;

// From game states
const startGame = (state: AppState) => state.game.startGame;
const currentGame = (state: AppState) => state.game.currentGame;
const gameData = (state: AppState) => state.game.gameData;
const beginCurrentGame = (state: AppState) => state.game.beginCurrentGame;
const bonusPos = (state: AppState) => state.game.bonusPos;

// From players states
const count = (state: AppState) => state.players.count;
const allPlayer = (state: AppState) => state.players.all;
const currentPlayer = (state: AppState) => state.players.current;
const currentPlayerPos = (state: AppState) => state.players.current.pos;
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

export const getBoardScale = createSelector(
  boardScale,
  scale => scale
);

export const getStartGame = createSelector(
  startGame,
  isGameStarted => isGameStarted
);

export const getCurrentGame = createSelector(
  currentGame,
  curGame => curGame
);

export const getBeginCurrentGame = createSelector(
  beginCurrentGame,
  game => game
);

export const getGameData = createDeepEqualSelector(
  gameData,
  gameData => gameData
);

export const getCurrentGamePreviousData = createDeepEqualSelector(
  [currentGame, gameData],
  (curGame, data) => data[curGame - 1]
);

export const getBonusPos = createSelector(
  bonusPos,
  pos => pos
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

export const getCurrentPlayerPos = createSelector(
  currentPlayerPos,
  pos => pos
);
