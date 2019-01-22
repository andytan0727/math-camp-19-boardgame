import { Reducer } from 'redux';
import { getLayout } from "../../utils/helpers/boardHelpers";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  BOX_HEIGHT,
  BOX_WIDTH
} from "../../utils/constants/gridConstants";
import { CHANGE_DIMENSIONS } from "../../utils/constants/actionTypes";

// Interfaces
import { IBoardState, ChangeDimensionAction  } from './types';

const initialState: IBoardState = {
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

export const board = (state = initialState, action: ChangeDimensionAction): IBoardState => {
  switch (action.type) {
    case CHANGE_DIMENSIONS:
      const gWidth: number = action.payload.width;
      const bWidth: number = gWidth / 10;

      // 30 x 10 board
      // 1 row = 10 boxes
      // Grid Height = 30 rows
      const gHeight: number = bWidth * 30;
      const bHeight: number = bWidth;

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
