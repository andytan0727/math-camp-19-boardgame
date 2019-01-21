import { getLayout } from "../utils/helpers/boardHelpers";

/**
 * Constants
 */
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  BOX_HEIGHT,
  BOX_WIDTH
} from "../utils/constants/gridConstants";
// Actions
import { CHANGE_DIMENSIONS } from "../utils/constants/actionTypes";

const initialState = {
  layout: getLayout({
    gWidth: GRID_WIDTH,
    gHeight: GRID_HEIGHT,
    bWidth: BOX_WIDTH,
    bHeight: BOX_HEIGHT
  }),
  grid: {
    width: GRID_WIDTH,
    height: GRID_HEIGHT
  },
  // occupancy: _initializeOccupancy(),
  box: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT
  }
};

export const board = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIMENSIONS:
      const gWidth = action.width;
      const bWidth = gWidth / 10;

      // 30 x 10 board
      // 1 row = 10 boxes
      // Grid Height = 30 rows
      const gHeight = bWidth * 30;
      const bHeight = bWidth;

      return {
        ...state,
        layout: getLayout({
          gWidth,
          gHeight,
          bWidth,
          bHeight
        }),
        grid: {
          width: gWidth,
          height: gHeight
        },
        box: {
          width: bWidth,
          height: bHeight
        }
      };

    default:
      return state;
  }
};
