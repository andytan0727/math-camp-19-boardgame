import { getLayout } from "../utils/helpers/boardHelpers";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  BOX_HEIGHT,
  BOX_WIDTH
} from "../utils/constants/gridConstants";

const initialState = {
  layout: getLayout({ GRID_WIDTH, GRID_HEIGHT, BOX_WIDTH, BOX_HEIGHT }),
  width: GRID_WIDTH,
  height: GRID_HEIGHT,
  // occupancy: _initializeOccupancy(),
  box: {
    height: BOX_HEIGHT,
    width: BOX_WIDTH
  }
};

export const board = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
