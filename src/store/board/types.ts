import { CHANGE_DIMENSIONS } from "../../utils/constants/actionTypes";

/**
 * Board states
 */
// Overall game board dimensions
export interface IDimensions {
  gWidth: number;
  gHeight: number;
  bWidth: number;
  bHeight: number;
}

// Tile's coordinate and id
export interface ITile {
  x: number;
  y: number;
  id: number;
}

// Collection of all tiles to group a game board
export interface ILayout {
  [key: string]: ITile;
}

// Grid dimensions
export interface IGridDim {
  width: number;
  height: number;
}

// Box/tile dimensions
export interface ITileDim {
  width: number;
  height: number;
}

export interface IBoardState {
  layout: ILayout;
  grid: IGridDim;
  box: ITileDim;
}

/**
 * Board actions
 */
export interface ChangeDimensionAction {
  type: typeof CHANGE_DIMENSIONS;
  payload: {
    width: number;
  };
}
