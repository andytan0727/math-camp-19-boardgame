import { players as playersReducer } from "./reducer";
import { getRandomColor } from "../../utils/helpers/playerHelpers";
import * as actionTypes from "../../utils/constants/actionTypes";

const firstPlayerId = 1;
const firstPlayerColor = getRandomColor();

const initialState = {
  count: 1,
  current: {
    id: 1,
    pos: 1,
    color: firstPlayerColor,
    game: [],
    path: [1]
  },
  all: [
    {
      id: 1,
      pos: 1,
      color: firstPlayerColor,
      game: [],
      path: [1]
    }
  ]
};

// Test default action
describe("testing players reducer", () => {
  test("should return default state", () => {
    expect(playersReducer(initialState, {})).toEqual(initialState);
  });

  test("should handle ADD_NEW_PLAYER", () => {
    expect(
      playersReducer(initialState, {
        type: actionTypes.ADD_NEW_PLAYER
      })
    ).toEqual({
      count: 2,
      current: {
        id: 1,
        pos: 1,
        color: firstPlayerColor,
        game: [],
        path: [1]
      },
      all: [
        {
          id: 1,
          pos: 1,
          color: firstPlayerColor,
          game: [],
          path: [1]
        },
        {
          id: 2,
          pos: 1,
          color: getRandomColor(),
          game: [
            {
              score: 0,
              extra: 0
            }
          ],
          path: [1]
        }
      ]
    });
  });

  test("should handle MOVE_PLAYER", () => {
    const scoresFilledState = {
      count: 1,
      current: {
        id: 1,
        pos: 1,
        color: firstPlayerColor,
        game: [
          {
            score: 10,
            extra: 10
          }
        ],
        path: [1]
      },
      all: [
        {
          id: 1,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 10,
              extra: 10
            }
          ],
          path: [1]
        }
      ]
    };
    expect(
      playersReducer(scoresFilledState, {
        type: actionTypes.MOVE_PLAYER,
        payload: {
          curGame: 1
        }
      })
    ).toEqual({
      count: 1,
      current: {
        id: 1,
        pos: 11,
        color: firstPlayerColor,
        game: [
          {
            score: 10,
            extra: 10
          }
        ],
        path: [1, 11]
      },
      all: [
        {
          id: 1,
          pos: 11,
          color: firstPlayerColor,
          game: [
            {
              score: 10,
              extra: 10
            }
          ],
          path: [1, 11]
        }
      ]
    });
  });

  test("should handle UPDATE_CURRENT_GAME_SCORE", () => {
    // No backup data supplied, but data is supplied
    // expect(
    //   playersReducer(initialState, {
    //     type: actionTypes.UPDATE_CURRENT_GAME_SCORE,
    //     payload: {
    //       curGame: 1,
    //       data: {
    //         score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //         extra: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
    //       }
    //     }
    //   })
    // ).toEqual({
    //   count: 1,
    //   current: {
    //     id: 1,
    //     pos: 1,
    //     color: firstPlayerColor,
    //     game: [
    //       {
    //         score: 1,
    //         extra: 1
    //       }
    //     ],
    //     path: [1]
    //   },
    //   all: [
    //     {
    //       id: 1,
    //       pos: 1,
    //       color: firstPlayerColor,
    //       game: [
    //         {
    //           score: 1,
    //           extra: 1
    //         }
    //       ],
    //       path: [1]
    //     }
    //   ]
    // });

    // No data supplied, but backup data is supplied
    expect(
      playersReducer(initialState, {
        type: actionTypes.UPDATE_CURRENT_GAME_SCORE,
        payload: {
          curGame: 1,
          data: [
            {
              score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              extra: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
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
      })
    ).toEqual({
      count: 1,
      current: {
        id: 1,
        pos: 1,
        color: firstPlayerColor,
        game: [
          {
            score: 1,
            extra: 1
          }
        ],
        path: [1]
      },
      all: [
        {
          id: 1,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 1,
              extra: 1
            }
          ],
          path: [1]
        }
      ]
    });

    // 10 players test
    // With data supplied
    const tenPlayersState = {
      count: 10,
      current: {
        id: firstPlayerId,
        pos: 1,
        color: firstPlayerColor,
        game: [],
        path: [1]
      },
      all: [
        {
          id: firstPlayerId,
          pos: 1,
          color: firstPlayerColor,
          game: [],
          path: [1]
        },
        {
          id: 2,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        },
        {
          id: 3,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        },
        {
          id: 4,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        },
        {
          id: 5,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        },
        {
          id: 6,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        },
        {
          id: 7,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        },
        {
          id: 8,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        },
        {
          id: 9,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        },
        {
          id: 10,
          pos: 1,
          color: getRandomColor(),
          game: [],
          path: [1]
        }
      ]
    };
    expect(
      playersReducer(tenPlayersState, {
        type: actionTypes.UPDATE_CURRENT_GAME_SCORE,
        payload: {
          curGame: 1,
          data: [
            {
              score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              extra: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
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
      })
    ).toEqual({
      count: 10,
      current: {
        id: 1,
        pos: 1,
        color: firstPlayerColor,
        game: [
          {
            score: 1,
            extra: 1
          }
        ],
        path: [1]
      },
      all: [
        {
          id: 1,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 1,
              extra: 1
            }
          ],
          path: [1]
        },
        {
          id: 2,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 2,
              extra: 2
            }
          ],
          path: [1]
        },
        {
          id: 3,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 3,
              extra: 1
            }
          ],
          path: [1]
        },
        {
          id: 4,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 4,
              extra: 2
            }
          ],
          path: [1]
        },
        {
          id: 5,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 5,
              extra: 1
            }
          ],
          path: [1]
        },
        {
          id: 6,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 6,
              extra: 2
            }
          ],
          path: [1]
        },
        {
          id: 7,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 7,
              extra: 1
            }
          ],
          path: [1]
        },
        {
          id: 8,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 8,
              extra: 2
            }
          ],
          path: [1]
        },
        {
          id: 9,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 9,
              extra: 1
            }
          ],
          path: [1]
        },
        {
          id: 10,
          pos: 1,
          color: firstPlayerColor,
          game: [
            {
              score: 10,
              extra: 2
            }
          ],
          path: [1]
        }
      ]
    });
  });
});
