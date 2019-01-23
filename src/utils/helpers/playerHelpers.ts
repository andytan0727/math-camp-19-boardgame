// Interfaces
import { ISinglePlayerObj } from "../../store/player/types";
import { ILayout, ITileDim } from "../../store/board/types";

const colorPalette: string[] = [
  "#5f6977",
  "#997f6c",
  "#7f5954",
  "#d8b477",
  "#789960",
  "#a7db64",
  "#3271ad",
  "#4c4096",
  "#c14188",
  "#8c3c88"
];

// Interfaces
interface grid {
  layout: ILayout;
  box: ITileDim;
}

export const getRandomColor = () => {
  if (colorPalette.length) {
    return colorPalette.pop();
  }
  return undefined;
};

export const generatePlayer = (curPlayerId: number): ISinglePlayerObj => ({
  id: curPlayerId + 1,
  color: getRandomColor()!,
  pos: "1",
  path: [1],
  score: 0,
  boxPosition: -1
});

export const getPlayerCoordinates = (
  pos: string,
  grid: grid,
  boxPos: number
) => {
  const {
    layout,
    box: { width, height }
  } = grid;

  const x = layout[pos].x;
  const y = layout[pos].y;

  switch (boxPos) {
    case 0:
    case 1:
    case 2:
    case 3:
      return {
        x: x - width / 4,
        y: y - height / 4
      };

    default:
      return {
        x,
        y
      };
  }
};
