import produce from "immer";
import deepFreeze from "deep-freeze";
import { board as boardReducer } from "./reducer";
import { getLayout } from "../../utils/helpers/boardHelpers";
import * as actionTypes from "../../utils/constants/actionTypes";

const initialState = {
  layout: { 0: { x: 0, y: 0, id: 1 } }, // Placeholder
  grid: {
    width: 0,
    height: 0
  },
  box: {
    width: 0,
    height: 0
  },
  scale: 1,
  defaultWidth: 1
};

deepFreeze(initialState);

describe("testing board reducer", () => {
  test("should return default state", () => {
    expect(boardReducer(initialState, {})).toEqual(initialState);
  });

  test("should handle CHANGE_DIMENSIONS", () => {
    expect(
      boardReducer(initialState, {
        type: actionTypes.CHANGE_DIMENSIONS,
        payload: {
          width: 600
        }
      })
    ).toEqual(
      produce(initialState, draft => {
        const gWidth = 600;
        const bWidth = gWidth / 10;
        const gHeight = bWidth * 30;
        const bHeight = bWidth;

        draft.layout = getLayout({
          gWidth,
          gHeight,
          bWidth,
          bHeight
        });
        draft.grid = {
          width: gWidth,
          height: gHeight
        };
        draft.box = {
          width: bWidth,
          height: bHeight
        };
        draft.defaultWidth = gWidth;
        return draft;
      })
    );
  });

  test("should handle SET_BOARD_SCALE", () => {
    expect(
      boardReducer(initialState, {
        type: actionTypes.SET_BOARD_SCALE,
        payload: {
          width: 600
        }
      })
    ).toEqual({
      ...initialState,
      scale: 600 / initialState.defaultWidth
    });
  });

  test("should handle SET_GRID_DIMENSION", () => {
    expect(
      boardReducer(initialState, {
        type: actionTypes.SET_GRID_DIMENSION,
        payload: {
          width: 600
        }
      })
    ).toEqual({
      ...initialState,
      grid: {
        width: 600,
        height: 1800
      }
    });
  });
});
