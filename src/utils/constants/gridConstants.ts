const gridMeasurement =
  window.innerWidth > 672 ? window.innerWidth / 2 + 180: window.innerWidth - 100;

// Initial dimensions
export const GRID_WIDTH = gridMeasurement;
export const BOX_WIDTH = GRID_WIDTH / 10;

export const GRID_HEIGHT = BOX_WIDTH * 30;
export const BOX_HEIGHT = BOX_WIDTH;