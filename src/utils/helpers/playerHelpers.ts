// Interfaces
import {
  ISinglePlayerObj,
  IScores,
  IScoresAll,
  IUpdatedData
} from "../../store/player/types";
import { ILayout, ITileDim } from "../../store/board/types";

export const colorPalette = [
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
  game: [
    {
      score: 0,
      extra: 0
    }
  ],
});

export const getPlayerCoordinates = (
  pos: string,
  grid: grid,
) => {
  const {
    layout,
  } = grid;

  const x = layout[pos].x;
  const y = layout[pos].y;

  return {
    x,
    y
  };
};

/**
 *
 * @param datFromFile Data from JSON file
 * @param curId from player
 *
 * @returns An Object {
 *   current: {
 *     game: [
 *       {
 *         score: number,
 *         extra: number
 *       },
 *       {
 *         score: number,
 *         extra: number
 *       },
 *       ...,
 *       {
 *         score: number,
 *         extra: number
 *       }
 *     ]
 *   },
 *   all: [
 *     {
 *       id: number,
 *       game: [
 *         { score: number, extra: number },
 *   5x    { score: number, extra: number },
 *         ...,
 *         { score: number, extra: number }
 *       ]
 *     },
 *     {
 *       id: number,
 *       game: [
 *         { score: number, extra: number },
 *   5x    { score: number, extra: number },
 *         ...,
 *         { score: number, extra: number }
 *       ]
 *     },
 *     {
 *       id: number,
 *       game: [
 *         { score: number, extra: number },
 *   5x    { score: number, extra: number },
 *         ...,
 *         { score: number, extra: number }
 *       ]
 *     },
 *     ...,
 *     {
 *       id: number,
 *       game: [
 *         { score: number, extra: number },
 *   5x    { score: number, extra: number },
 *         ...,
 *         { score: number, extra: number }
 *       ]
 *     }
 *   ]
 * }
 */
export const updatePlayerScores = (
  datFromFile: Array<IScoresAll>,
  curId: number
) => {
  let updatedData: IUpdatedData = {
    current: {
      id: 1,
      game: []
    },
    all: []
  };

  // Populating updatedData.all with data from JSON
  for (const game of Array.from(datFromFile)) {
    const { score, extra } = game;

    // Update scores
    for (let i = 0; i < score.length; i++) {
      const curPlayerGameVal: IScores = {
        score: score[i],
        extra: extra[i]
      };

      updatedData = !(
        updatedData.all &&
        updatedData.all[i] &&
        updatedData.all[i].game
      )
        ? {
            ...updatedData,
            all: [
              ...updatedData.all,
              {
                id: i + 1,
                game: [curPlayerGameVal]
              }
            ]
          }
        : {
            ...updatedData,
            all: updatedData.all.map(player => {
              return player.id === i + 1
                ? {
                    id: i + 1,
                    game: [...updatedData.all[i].game, curPlayerGameVal]
                  }
                : player;
            })
          };
    }
  }

  // Assgin current player its data
  const curPlayerData = updatedData.all.filter(player => player.id === curId);

  return {
    ...updatedData,
    current: curPlayerData[0]
  };
};

export const getNextPlayer = ({
  all,
  current,
  count
}: {
  all: Array<ISinglePlayerObj>;
  current: ISinglePlayerObj;
  count: number;
}) => {
  // If current player is the last player
  // return last player
  // else return next player
  return current.id === count
    ? all[0]
    : all.filter(player => player.id === current.id + 1)[0];
};
