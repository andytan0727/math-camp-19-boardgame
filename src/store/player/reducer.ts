import produce from "immer";

import {
  ADD_NEW_PLAYER,
  MOVE_PLAYER,
  CHANGE_PLAYER,
  UPDATE_CURRENT_GAME_SCORE,
  MOVE_ONCE_PER_PLAYER
} from "../../utils/constants/actionTypes";
import {
  // colorPalette,
  getRandomColor,
  generatePlayer,
  getNextPlayer
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
  all: Array.from({ length: 10 }, (el, idx) => idx + 1).map(val => ({
    id: val,
    pos: 1,
    color: val === 1 ? firstPlayerColor : getRandomColor()!,
    game: [],
    path: [1]
  }))
  // all: [
  //   {
  //     id: firstPlayerId,
  //     pos: 1,
  //     color: firstPlayerColor,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 2,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 3,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 4,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 5,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 6,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 7,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 8,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 9,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   },
  //   {
  //     id: 10,
  //     pos: 1,
  //     color: getRandomColor()!,
  //     game: [],
  //     path: [1]
  //   }
  // ]
};

export const players = produce((draft, action: PlayerActions) => {
  switch (action.type) {
    case ADD_NEW_PLAYER:
      const newPlayer = generatePlayer(draft.count);
      draft.all.push(newPlayer);
      draft.count++;
      return draft;

    case MOVE_PLAYER:
      draft.all.forEach(player => {
        const newPos =
          player.pos + player.game[action.payload.curGame - 1].score;

        // New position less than 300
        // Not yet win
        if (newPos < 300 && newPos >= 1) {
          player.pos = newPos;
          player.path.push(newPos);

          if (draft.current.id === player.id) {
            draft.current.pos = newPos;
            draft.current.path.push(newPos);
          }
        } else if (newPos < 1) {
          player.pos = 1;
          player.path.push(player.pos);
          console.log(
            `Player-${
              player.id
            } falls beyond minimum board position. Remaining at position 1 ...`
          );
        } else {
          player.pos = 300;
          player.path.push(player.path.includes(player.pos) ? player.pos : 0);
          console.log(`Player-${player.id} won!!! Applause!!!`);
        }
      });

      return draft;

    case MOVE_ONCE_PER_PLAYER:
      const curScore = draft.current.game[action.payload.curGame - 1].score;
      const curExtra = draft.current.game[action.payload.curGame - 1].extra;
      const newPos =
        action.payload.scoreType.toLowerCase() === "score"
          ? draft.current.pos + curScore
          : draft.current.pos + curExtra;

      // New position less than 300
      // Not yet win
      if (newPos < 300 && newPos >= 1) {
        draft.current.pos = newPos;
        draft.current.path.push(newPos);

        // Update allPlayers array
        draft.all[draft.current.id - 1] = draft.current;
      } else if (newPos < 1) {
        draft.current.pos = 1;
        draft.current.path.push(draft.current.pos);
        // Update allPlayers array
        draft.all[draft.current.id - 1] = draft.current;
        console.log(
          `Player-${
            draft.current.id
          } falls beyond minimum board position. Remaining at position 1 ...`
        );
      } else {
        draft.current.pos = 300;
        draft.current.path.push(
          draft.current.path.includes(draft.current.pos) ? draft.current.pos : 0
        );
        // Update allPlayers array
        draft.all[draft.current.id - 1] = draft.current;
        console.log(`Player-${draft.current.id} won!!! Applause!!!`);
      }

      return draft;

    case CHANGE_PLAYER:
      const nextPlayer = getNextPlayer(draft);
      draft.current = nextPlayer;
      return draft;

    case UPDATE_CURRENT_GAME_SCORE:
      const curGame = action.payload.curGame;
      console.log(`curGame: ${curGame}`);

      const { score, extra } = action.payload.data[curGame - 1];

      // const { score, extra } =
      //   action.payload.data || action.payload.backupData![curGame - 1];

      const len = draft.all.length;

      for (let i = 0; i < len; i++) {
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
