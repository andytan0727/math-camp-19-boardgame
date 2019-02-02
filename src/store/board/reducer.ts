import produce from "immer";
import { getLayout } from "../../utils/helpers/boardHelpers";
// import {
//   GRID_HEIGHT,
//   GRID_WIDTH,
//   BOX_HEIGHT,
//   BOX_WIDTH
// } from "../../utils/constants/gridConstants";
import {
  CHANGE_DIMENSIONS,
  SET_BOARD_SCALE,
  SET_GRID_DIMENSION
} from "../../utils/constants/actionTypes";

// Interfaces
import { IBoardState, IBoardActions } from "./types";

const initialState: IBoardState = {
  layout: { 0: { x: 0, y: 0, id: 1 } }, // Placeholder
  grid: {
    width: 0,
    height: 0
  },
  // occupancy: _initializeOccupancy(),
  box: {
    width: 0,
    height: 0
  },
  scale: 1,
  defaultWidth: 1
};

export const board = produce((draft, action: IBoardActions) => {
  switch (action.type) {
    case CHANGE_DIMENSIONS:
      const gWidth = action.payload.width;
      const bWidth = gWidth / 10;

      // 30 x 10 board
      // 1 row = 10 boxes
      // Grid Height = 30 rows
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

    case SET_BOARD_SCALE:
      draft.scale = action.payload.width / draft.defaultWidth;
      return draft;

    case SET_GRID_DIMENSION:
      draft.grid.width = action.payload.width;
      draft.grid.height = action.payload.width * 3;
      return draft;

    default:
      return draft;
  }
}, initialState);
