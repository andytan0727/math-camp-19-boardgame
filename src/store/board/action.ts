import {
  CHANGE_DIMENSIONS,
  SET_BOARD_SCALE,
  SET_GRID_DIMENSION
} from "../../utils/constants/actionTypes";

export const changeDimensions = (width: number) => ({
  type: CHANGE_DIMENSIONS,
  payload: {
    width
  }
});

export const setBoardScale = (width: number) => ({
  type: SET_BOARD_SCALE,
  payload: {
    width
  }
});

export const setGridDimension = (width: number) => ({
  type: SET_GRID_DIMENSION,
  payload: {
    width
  }
});
