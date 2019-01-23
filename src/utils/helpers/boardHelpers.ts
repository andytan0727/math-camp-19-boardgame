// Interfaces
import { IDimensions, ILayout } from '../../store/board/types';

export const getLayout = (dimensions: IDimensions): ILayout => {
  const {
    gWidth: gridWidth,
    gHeight: gridHeight,
    bWidth: boxWidth,
    bHeight: boxHeight
  } = dimensions;

  // Make a 300 rows game
  let layout: ILayout = {};
  const oddRows: number[] = [];
  const evenRows: number[] = [];
  for (let i = 0; i <= 29; i++) {
    if (i % 2) {
      oddRows.push(i);
    } else {
      evenRows.push(i);
    }
  }

  // Main logic for grid drawing
  for (let col = 1; col <= 10; col++) {
    // Even rows numbering go from left to right
    evenRows.forEach(row => {
      layout[row * 10 + col] = {
        x: Math.floor((col - 1) * boxWidth + boxWidth / 2),
        y: Math.floor(gridHeight - (row * boxHeight + boxHeight / 2)),
        id: col + 10 * row
      };
    });

    // Odd rows numbering go from right to left
    oddRows.forEach(row => {
      layout[col + 10 * row] = {
        x: Math.floor(gridWidth - ((col - 1) * boxWidth + boxWidth / 2)),
        y: Math.floor(gridHeight - (row * boxHeight + boxHeight / 2)),
        id: col + 10 * row
      };
    });
  }
  return layout;
};
