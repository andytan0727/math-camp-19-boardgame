import { game as gameReducer } from "./reducer";
import * as actionTypes from "../../utils/constants/actionTypes";

const initialState = {
  startGame: true,
  currentGame: 1,
  beginCurrentGame: false,
  gameData: []
};

describe("testing game reducer", () => {
  // default action
  test("should return default state", () => {
    expect(gameReducer(initialState, {})).toEqual(initialState);
  });

  test("should handle START_GAME", () => {
    expect(
      gameReducer(initialState, {
        type: actionTypes.START_GAME
      })
    ).toEqual({
      ...initialState,
      startGame: !initialState.startGame
    });
  });

  test("should handle INITIALIZE_DATA", () => {
    expect(
      gameReducer(initialState, {
        type: actionTypes.INITIALIZE_DATA,
        payload: {
          data: Array.from({ length: 5 }, () => 1).map(() => ({
            score: Array.from({ length: 10 }, () => 1),
            extra: Array.from({ length: 10 }, () => 1)
          }))
        }
      })
    ).toEqual({
      ...initialState,
      gameData: Array.from({ length: 5 }, () => 1).map(() => ({
        score: Array.from({ length: 10 }, () => 1),
        extra: Array.from({ length: 10 }, () => 1)
      }))
    });
  });

  test("should handle NEXT_GAME", () => {
    expect(
      gameReducer(initialState, {
        type: actionTypes.NEXT_GAME
      })
    ).toEqual({
      ...initialState,
      currentGame: initialState.currentGame + 1
    });
  });

  test("should handle SET_GAME", () => {
    expect(
      gameReducer(initialState, {
        type: actionTypes.SET_GAME,
        payload: {
          game: 2
        }
      })
    ).toEqual({
      ...initialState,
      currentGame: 2
    });
  });

  test("should handle TOGGLE_BEGIN_CURRENT_GAME", () => {
    expect(
      gameReducer(initialState, {
        type: actionTypes.TOGGLE_BEGIN_CURRENT_GAME
      })
    ).toEqual({
      ...initialState,
      beginCurrentGame: !initialState.beginCurrentGame
    });
  });
});
