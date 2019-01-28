import produce from "immer";

import {
  ADD_NEW_PLAYER,
  ADD_FILE,
  MOVE_PLAYER,
  CHANGE_PLAYER,
  UPDATE_CURRENT_GAME_SCORE
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
    pos: 1,
    color: firstPlayerColor,
    game: [],
    path: [1]
  },
  all: [
    {
      id: firstPlayerId,
      pos: 1,
      color: firstPlayerColor,
      game: [],
      path: [1]
    },
    {
      id: 2,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    },
    {
      id: 3,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    },
    {
      id: 4,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    },
    {
      id: 5,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    },
    {
      id: 6,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    },
    {
      id: 7,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    },
    {
      id: 8,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    },
    {
      id: 9,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    },
    {
      id: 10,
      pos: 1,
      color: getRandomColor()!,
      game: [],
      path: [1]
    }
  ]
};

export const players = produce((draft, action: PlayerActions) => {
  switch (action.type) {
    case ADD_NEW_PLAYER:
      const newPlayer = generatePlayer(draft.count);
      draft.all.push(newPlayer);
      draft.count++;
      return draft;

    case ADD_FILE: {
      const updatedData = updatePlayerScores(action.payload.data, 1);

      // Update current player's scores
      updatedData.current.game.forEach((game, idx) => {
        draft.current.game[idx] = game;
      });

      // Update all players' scores
      updatedData.all.forEach((player, playerIdx) => {
        player.game.forEach((game, gameIdx) => {
          draft.all[playerIdx].game[gameIdx] = game;
        });
      });
      return draft;
    }

    case MOVE_PLAYER:
      draft.all.forEach(player => {
        const newPos =
          player.pos + player.game[action.payload.curGame - 1].score;

        // New position less than 300
        // Not yet win
        if (newPos < 300) {
          player.pos = newPos;
          player.path.push(newPos);

          if (draft.current.id === player.id) {
            draft.current.pos = newPos;
            draft.current.path.push(newPos);
          }
        } else {
          player.pos = 300;
          player.path.push(player.path.includes(player.pos) ? player.pos : 0);
          console.log(`Player-${player.id} won!!! Applause!!!`);
        }
      });

      return draft;

    case CHANGE_PLAYER:
      const nextPlayer = getNextPlayer(draft);

      return {
        ...draft,
        current: nextPlayer
      };

    case UPDATE_CURRENT_GAME_SCORE:
      const curGame = action.payload.curGame;

      const { score, extra } =
        action.payload.data || action.payload.backupData![curGame - 1];
      const scoreLen = score.length;
      const extraLen = extra.length;

      for (let i = 0; i < scoreLen && i < extraLen; i++) {
        if (i === draft.current.id - 1) {
          draft.current.game[curGame - 1] = {
            score: score[i],
            extra: extra[i]
          };
        }

        draft.all[i].game[curGame - 1] = {
          score: score[i],
          extra: extra[i]
        };
      }

      return draft;

    default:
      return draft;
  }
}, initialState);
