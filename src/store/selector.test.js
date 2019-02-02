import * as selector from "./selector";
import { rootReducer } from "./index";
import // GRID_WIDTH
// GRID_HEIGHT,
// BOX_WIDTH,
// BOX_HEIGHT
"../utils/constants/gridConstants";
// import { getLayout } from "../../utils/helpers/boardHelpers";
import {
  CHANGE_DIMENSIONS,
  ADD_NEW_PLAYER,
  UPDATE_CURRENT_GAME_SCORE,
  UPDATE_DATA,
  START_GAME
} from "../utils/constants/actionTypes";

const state = rootReducer({}, {});

// Current layout and resize action
describe("select current layout", () => {
  const layoutSelector = selector.getCurrentLayout;

  test("should select layout correctly", () => {
    expect(layoutSelector(state)).toEqual(state.board.layout);
  });

  test("memoized correctly with CHANGE_DIMENSIONS action", () => {
    // Reset recomputation count
    // And select new object
    expect(layoutSelector.recomputations()).toBe(1); // From previous test

    // Get current state by dispatching an action to rootReducer

    const layState = rootReducer(state, {
      type: CHANGE_DIMENSIONS,
      payload: {
        width: 0 // Same as default width used by rootReducer
      }
    });
    expect(layoutSelector(layState)).toEqual(layState.board.layout);
    expect(layoutSelector.recomputations()).toBe(2);

    const layState2 = rootReducer(state, {
      type: CHANGE_DIMENSIONS,
      payload: {
        width: 200
      }
    });
    expect(layoutSelector(layState2)).toEqual(layState2.board.layout);
    expect(layoutSelector.recomputations()).toBe(3);

    const layState3 = rootReducer(state, {
      type: CHANGE_DIMENSIONS,
      payload: {
        width: 200
      }
    });
    expect(layoutSelector(layState3)).toEqual(layState3.board.layout);
    expect(layoutSelector.recomputations()).toBe(3);
  });
});

// Grid dimensions
describe("select grid dimensions", () => {
  const gridDimSelector = selector.getGridDimensions;
  test("should select correctly", () => {
    expect(gridDimSelector(state)).toEqual(state.board.grid);
  });

  test("memoized correctly", () => {
    expect(gridDimSelector(state)).toEqual(state.board.grid);
    expect(gridDimSelector.recomputations()).toBe(1);

    expect(gridDimSelector(state)).toEqual(state.board.grid);
    expect(gridDimSelector.recomputations()).toBe(1);
  });
});

// Box dimensions
describe("select box dimensions", () => {
  const boxDimSelector = selector.getBoxDimensions;
  test("should select correctly", () => {
    expect(boxDimSelector(state)).toEqual(state.board.box);
  });

  test("should memoized correctly", () => {
    expect(boxDimSelector(state)).toEqual(state.board.box);
    expect(boxDimSelector.recomputations()).toBe(1);

    expect(boxDimSelector(state)).toEqual(state.board.box);
    expect(boxDimSelector.recomputations()).toBe(1);
  });
});

// Game Started?
describe("select start game boolean", () => {
  const startGameSelector = selector.getStartGame;

  test("should select correctly", () => {
    // Default to true
    expect(startGameSelector(state)).toBeTruthy();

    // Dispatch a startGame action
    expect(
      startGameSelector(
        rootReducer(
          {},
          {
            type: START_GAME
          }
        )
      )
    ).toBeFalsy();
  });

  test("should memoize correctly", () => {
    startGameSelector.resetRecomputations();
    startGameSelector(state);
    expect(startGameSelector.recomputations()).toBe(1);

    startGameSelector(state);
    expect(startGameSelector.recomputations()).toBe(1);

    startGameSelector(
      rootReducer(
        {},
        {
          type: START_GAME
        }
      )
    );
    expect(startGameSelector.recomputations()).toBe(2);
  });
});

// Current game
describe("select current game count", () => {
  const curGameSelector = selector.getCurrentGame;
  test("should select correctly", () => {
    expect(curGameSelector(state)).toBe(state.game.currentGame);
  });

  test("should memoized correctly", () => {
    curGameSelector(state);
    expect(curGameSelector.recomputations()).toBe(1);

    curGameSelector(state);
    expect(curGameSelector.recomputations()).toBe(1);
  });
});

// Current game score data
describe("select current game data", () => {
  const curGamePrevDataSelector = selector.getCurrentGamePreviousData;
  test("should select correctly", () => {
    expect(curGamePrevDataSelector(state)).toEqual(
      state.game.gameData[state.game.currentGame - 1]
    );

    expect(
      curGamePrevDataSelector.resultFunc(1, [
        {
          score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          score: [11, 12, 2, 21, 52, 61, 7, 82, 92, 120],
          extra: [21, 2, 0, 12, 4, 0, 0, 0, 0, 0]
        },
        {
          score: [1, 21, 3, 24, 15, 6, 7, 8, 9, 13],
          extra: [10, 0, 0, 0, 10, 0, 0, 0, 0, 0]
        },
        {
          score: [1, 2, 3, 4, 5, 6, 71, 8, 9, 10],
          extra: [0, 0, 0, 0, 0, 0, 7, 0, 0, 0]
        },
        {
          score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
        }
      ])
    ).toEqual({
      score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
      extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
    });

    expect(
      curGamePrevDataSelector.resultFunc(5, [
        {
          score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          score: [11, 12, 2, 21, 52, 61, 7, 82, 92, 120],
          extra: [21, 2, 0, 2, 4, 0, 0, 0, 0, 0]
        },
        {
          score: [1, 21, 3, 24, 15, 6, 7, 8, 9, 13],
          extra: [10, 0, 0, 0, 1, 0, 0, 0, 0, 0]
        },
        {
          score: [1, 21, 3, 4, 5, 6, 1, 8, 9, 10],
          extra: [0, 0, 0, 0, 0, 0, 7, 0, 0, 0]
        },
        {
          score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
        }
      ])
    ).toEqual({
      score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      extra: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
    });
  });

  test("should memoized correctly", () => {
    curGamePrevDataSelector(state);
    expect(curGamePrevDataSelector.recomputations()).toBe(1);

    // Dispatch an action
    const gameState = rootReducer(state, {
      type: UPDATE_DATA,
      payload: {
        data: [
          {
            score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            score: [11, 12, 2, 21, 52, 61, 7, 82, 92, 120],
            extra: [21, 2, 0, 2, 4, 0, 0, 0, 0, 0]
          },
          {
            score: [1, 21, 3, 24, 15, 6, 7, 8, 9, 13],
            extra: [10, 0, 0, 0, 1, 0, 0, 0, 0, 0]
          },
          {
            score: [1, 21, 3, 4, 5, 6, 1, 8, 9, 10],
            extra: [0, 0, 0, 0, 0, 0, 7, 0, 0, 0]
          },
          {
            score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
          }
        ]
      }
    });
    curGamePrevDataSelector(gameState);
    expect(curGamePrevDataSelector.recomputations()).toBe(2);

    // Memoization from previous selection
    curGamePrevDataSelector(gameState);
    expect(curGamePrevDataSelector.recomputations()).not.toBe(3);
    expect(curGamePrevDataSelector.recomputations()).toBe(2);
  });
});

// Get players' count
describe("select players count", () => {
  const countSelector = selector.getCount;

  test("should select correctly", () => {
    expect(countSelector(state)).toBe(state.players.count);

    // Dispatch action
    const countState = rootReducer(state, {
      type: ADD_NEW_PLAYER
    });
    expect(countSelector(countState)).toBe(countState.players.count);
  });

  test("should memoized correctly", () => {
    const defaultCountState = rootReducer(state, {});
    const countState = rootReducer(state, {
      type: ADD_NEW_PLAYER
    });

    // Recompute
    countSelector(countState);
    expect(countSelector.recomputations()).toBe(2);

    // Memoization starts
    countSelector(defaultCountState);
    expect(countSelector.recomputations()).toBe(3);

    countSelector(defaultCountState);
    expect(countSelector.recomputations()).toBe(3);
  });
});

// Get all players
describe("select all players", () => {
  const allPlayersSelector = selector.getAllPlayers;
  test("should select all players correctly", () => {
    expect(allPlayersSelector(state)).toEqual(state.players.all);
  });

  test("should memoize correctly", () => {
    // Memoization from previous selection
    expect(allPlayersSelector(state)).toEqual(state.players.all);
    expect(allPlayersSelector.recomputations()).toBe(1);

    // Dispatch random action to change all players
    const updatedState = rootReducer(state, {
      type: UPDATE_DATA,
      payload: {
        data: [
          {
            score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            score: [11, 12, 2, 21, 52, 61, 7, 82, 92, 120],
            extra: [21, 2, 0, 2, 4, 0, 0, 0, 0, 0]
          },
          {
            score: [1, 21, 3, 24, 15, 6, 7, 8, 9, 13],
            extra: [10, 0, 0, 0, 1, 0, 0, 0, 0, 0]
          },
          {
            score: [1, 21, 3, 4, 5, 6, 1, 8, 9, 10],
            extra: [0, 0, 0, 0, 0, 0, 7, 0, 0, 0]
          },
          {
            score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
          }
        ]
      }
    });
    const newUpdatedState = rootReducer(updatedState, {
      type: UPDATE_CURRENT_GAME_SCORE,
      payload: {
        curGame: 1,
        data: [
          {
            score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            score: [11, 12, 2, 21, 52, 61, 7, 82, 92, 120],
            extra: [21, 2, 0, 2, 4, 0, 0, 0, 0, 0]
          },
          {
            score: [1, 21, 3, 24, 15, 6, 7, 8, 9, 13],
            extra: [10, 0, 0, 0, 1, 0, 0, 0, 0, 0]
          },
          {
            score: [1, 21, 3, 4, 5, 6, 1, 8, 9, 10],
            extra: [0, 0, 0, 0, 0, 0, 7, 0, 0, 0]
          },
          {
            score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
          }
        ],
        // data: {
        //   score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
        //   extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
        // }
      }
    });
    expect(allPlayersSelector(newUpdatedState)).toEqual(
      newUpdatedState.players.all
    );
    expect(allPlayersSelector.recomputations()).toBe(2);

    // Memoization
    expect(allPlayersSelector(newUpdatedState)).toEqual(
      newUpdatedState.players.all
    );
    expect(allPlayersSelector.recomputations()).toBe(2);
  });
});

// Get current player
describe("select current player", () => {
  const curPlayerSelector = selector.getCurrentPlayer;
  test("should select correctly", () => {
    expect(curPlayerSelector(state)).toEqual(state.players.current);
  });

  test("should memoize correctly", () => {
    expect(curPlayerSelector(state)).toEqual(state.players.current);
    expect(curPlayerSelector.recomputations()).toBe(1);

    const updatedState = rootReducer(state, {
      type: UPDATE_DATA,
      payload: {
        data: [
          {
            score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            score: [11, 12, 2, 21, 52, 61, 7, 82, 92, 120],
            extra: [21, 2, 0, 2, 4, 0, 0, 0, 0, 0]
          },
          {
            score: [1, 21, 3, 24, 15, 6, 7, 8, 9, 13],
            extra: [10, 0, 0, 0, 1, 0, 0, 0, 0, 0]
          },
          {
            score: [1, 21, 3, 4, 5, 6, 1, 8, 9, 10],
            extra: [0, 0, 0, 0, 0, 0, 7, 0, 0, 0]
          },
          {
            score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
          }
        ]
      }
    });
    const newUpdatedState = rootReducer(updatedState, {
      type: UPDATE_CURRENT_GAME_SCORE,
      payload: {
        curGame: 1,
        data: [
          {
            score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            score: [2, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [2, 2, 1, 2, 1, 2, 1, 2, 1, 2]
          },
          {
            score: [3, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [3, 2, 1, 2, 1, 2, 1, 2, 1, 2]
          },
          {
            score: [4, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [4, 2, 1, 2, 1, 2, 1, 2, 1, 2]
          },
          {
            score: [5, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            extra: [5, 2, 1, 2, 1, 2, 1, 2, 1, 2]
          }
        ]
      }
    });

    expect(curPlayerSelector(newUpdatedState)).toEqual(
      newUpdatedState.players.current
    );
    expect(curPlayerSelector.recomputations()).toBe(2);

    expect(curPlayerSelector(newUpdatedState)).toEqual(
      newUpdatedState.players.current
    );
    expect(curPlayerSelector.recomputations()).toBe(2);
  });
});

// Get current player score
describe("select current player score", () => {
  const playerScoreSelector = selector.getCurrentPlayerScore;
  const updatedState = rootReducer(state, {
    type: UPDATE_DATA,
    payload: {
      data: [
        {
          score: [1, 12, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [1, 20, 3, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          score: [11, 12, 2, 21, 52, 61, 7, 82, 92, 120],
          extra: [21, 2, 0, 2, 4, 0, 0, 0, 0, 0]
        },
        {
          score: [1, 21, 3, 24, 15, 6, 7, 8, 9, 13],
          extra: [10, 0, 0, 0, 1, 0, 0, 0, 0, 0]
        },
        {
          score: [1, 21, 3, 4, 5, 6, 1, 8, 9, 10],
          extra: [0, 0, 0, 0, 0, 0, 7, 0, 0, 0]
        },
        {
          score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
        }
      ]
    }
  });
  const newUpdatedState = rootReducer(updatedState, {
    type: UPDATE_CURRENT_GAME_SCORE,
    payload: {
      curGame: 1, // * Pay attention to currentGame in game reducer !!!!
      data: [
        {
          score: [11, 12, 2, 21, 52, 61, 7, 82, 92, 120],
          extra: [21, 2, 0, 2, 4, 0, 0, 0, 0, 0]
        },
        {
          score: [2, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [2, 2, 1, 2, 1, 2, 1, 2, 1, 2]
        },
        {
          score: [3, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [3, 2, 1, 2, 1, 2, 1, 2, 1, 2]
        },
        {
          score: [4, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [4, 2, 1, 2, 1, 2, 1, 2, 1, 2]
        },
        {
          score: [5, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          extra: [5, 2, 1, 2, 1, 2, 1, 2, 1, 2]
        }
      ]
    }
  });

  test("should select correctly", () => {
    expect(playerScoreSelector(newUpdatedState)).toEqual(
      newUpdatedState.players.current.game[newUpdatedState.game.currentGame - 1]
        .score
    );
  });

  test("should memoized correctly", () => {
    expect(playerScoreSelector.recomputations()).toBe(1);
    expect(playerScoreSelector(newUpdatedState)).toEqual(
      newUpdatedState.players.current.game[newUpdatedState.game.currentGame - 1]
        .score
    );
    // Memoize
    expect(playerScoreSelector.recomputations()).toBe(1);

    expect(playerScoreSelector(state)).toBeUndefined();
    expect(playerScoreSelector.recomputations()).toBe(2);
  });
});
