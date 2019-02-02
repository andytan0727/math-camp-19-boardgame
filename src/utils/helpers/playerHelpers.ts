// Interfaces
import { ISinglePlayerObj } from "../../store/player/types";
import { ILayout, ITileDim } from "../../store/board/types";

export const colorPalette = [
  "red",
  "orange",
  "grey",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "brown"
];

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
  pos: 1,
  path: [1],
  game: [
    {
      score: 0,
      extra: 0
    }
  ]
});

export const getPlayerCoordinates = (pos: string, grid: grid) => {
  const { layout } = grid;

  const x = layout[pos].x;
  const y = layout[pos].y;

  return {
    x,
    y
  };
};

// If current player is the last player
// return last player
// else return next player
export const getNextPlayer = ({
  all,
  current,
  count
}: {
  all: Array<ISinglePlayerObj>;
  current: ISinglePlayerObj;
  count: number;
}) =>
  current.id === count
    ? all[0]
    : all.filter(player => player.id === current.id + 1)[0];
