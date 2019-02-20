import produce from "immer";
import {
  ADD_NEW_PLAYER,
  CHANGE_PLAYER,
  UPDATE_CURRENT_GAME_SCORE,
  MOVE_ONCE_PER_PLAYER,
  RESTORE_PLAYERS
} from "../../utils/constants/actionTypes";
import {
  getPlayerName,
  getRandomColor,
  generatePlayer,
  getNextPlayer
} from "../../utils/helpers/playerHelpers";

// Interfaces
import { IPlayers, PlayerActions } from "./types";

const firstPlayerColor = getRandomColor()!;
const firstPlayerName = getPlayerName()!;
const firstPlayerId = 1;

const initialState: IPlayers = {
  count: 10,
  current: {
    id: firstPlayerId,
    name: firstPlayerName,
    pos: 1,
    color: firstPlayerColor,
    game: [],
    path: [1]
  },
  all: Array.from({ length: 10 }, (el, idx) => idx + 1).map(val => ({
    id: val,
    name: val === 1 ? firstPlayerName : getPlayerName()!,
    pos: 1,
    color: val === 1 ? firstPlayerColor : getRandomColor()!,
    game: [],
    path: [1]
  }))
};

export const players = produce((draft, action: PlayerActions) => {
  switch (action.type) {
    case ADD_NEW_PLAYER: {
      const newPlayer = generatePlayer(draft.count);
      draft.all.push(newPlayer);
      draft.count++;
      return draft;
    }

    case UPDATE_CURRENT_GAME_SCORE: {
      const gameData = action.payload.data;
      const len = draft.all.length;

      for (let i = 0; i < len; i++) {
        if (i === draft.current.id - 1) {
          draft.current.game[0] = gameData[i];
        }

        draft.all[i].game[0] = gameData[i];
      }

      return draft;
    }

    case MOVE_ONCE_PER_PLAYER: {
      const newPos = draft.current.game[0];

      // New position less than 300
      // Not yet win
      if (newPos < 300 && newPos >= 1) {
        draft.current.pos = newPos;
        draft.current.path.push(newPos);

        // // Update allPlayers array
      } else if (newPos < 1) {
        draft.current.pos = 1;
        draft.current.path.push(draft.current.pos);
        // // Update allPlayers array
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
        // // Update allPlayers array
        console.log(`Player-${draft.current.id} won!!! Applause!!!`);
      }

      // Update allPlayers array
      draft.all[draft.current.id - 1] = draft.current;

      return draft;
    }

    case CHANGE_PLAYER: {
      draft.current = getNextPlayer(draft);
      return draft;
    }

    case RESTORE_PLAYERS: {
      draft.current = action.payload.players.current;
      draft.all = action.payload.players.all;
      return draft;
    }

    default:
      return draft;
  }
}, initialState);
