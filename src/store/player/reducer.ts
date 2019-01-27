import {
  ADD_NEW_PLAYER,
  ADD_FILE,
  // MOVE_PLAYER,
  CHANGE_PLAYER
} from "../../utils/constants/actionTypes";
import {
  // colorPalette,
  getRandomColor,
  generatePlayer,
  getNextPlayer,
  updatePlayerScores
} from "../../utils/helpers/playerHelpers";

// Interfaces
import { IPlayers, PlayerActions } from "./types";

const firstPlayerColor = getRandomColor()!;
const firstPlayerId = 1;

const initialState: IPlayers = {
  count: 10,
  current: {
    id: firstPlayerId,
    pos: "1",
    color: firstPlayerColor,
    game: [],
    path: [1],
  },
  all: [
    {
      id: firstPlayerId,
      pos: "1",
      color: firstPlayerColor,
      game: [],
      path: [1],
    },
    {
      id: 2,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    },
    {
      id: 3,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    },
    {
      id: 4,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    },
    {
      id: 5,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    },
    {
      id: 6,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    },
    {
      id: 7,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    },
    {
      id: 8,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    },
    {
      id: 9,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    },
    {
      id: 10,
      pos: "1",
      color: getRandomColor()!,
      game: [],
      path: [1],
    }
  ]
};

export const players = (state = initialState, action: PlayerActions) => {
  switch (action.type) {
    case ADD_NEW_PLAYER:
      const newPlayer = generatePlayer(state.count);

      return {
        ...state,
        all: [...state.all, newPlayer],
        count: state.count + 1
      };

    case ADD_FILE: {
      const updatedData = updatePlayerScores(action.payload.data, 1);
      console.log(updatedData);

      return {
        ...state,
        current: {
          ...state.current,
          game: updatedData.current.game.map((game, ind) => {
            if (
              state.current.game.length &&
              state.current.game[ind].score === game.score &&
              state.current.game[ind].extra === game.extra
            ) {
              return state.current.game[ind];
            }
            return game;
          })
        },
        all: updatedData.all.map((player, playerIdx) => {
          return {
            ...state.all[playerIdx],
            game: player.game.map((game, gameIdx) => {
              if (
                state.all[playerIdx].game.length &&
                state.all[playerIdx].game[playerIdx].score === game.score &&
                state.all[playerIdx].game[playerIdx].extra === game.extra
              ) {
                return state.all[playerIdx].game[gameIdx];
              }
              return game;
            })
          };
        })
      };
    }

    // case MOVE_PLAYER:
    //   return {
    //     ...state,
    //     current: {
    //       ...state.current,
    //       pos: action.payload.newPos,
    //       boxPosition: -1,
    //       path: [...state.current.path, action.payload.newPos]
    //     },
    //     all: state.all.map(player => {
    //       if (player.id === state.current.id) {
    //         return {
    //           ...player,
    //           pos: action.payload.newPos,
    //           boxPosition: -1,
    //           path: [...player.path, action.payload.newPos]
    //         };
    //       }
    //       return player;
    //     })
    //   };

    case CHANGE_PLAYER:
      const nextPlayer = getNextPlayer(state);

      return {
        ...state,
        current: nextPlayer
      };

    default:
      return state;
  }
};
