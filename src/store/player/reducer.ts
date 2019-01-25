import { ADD_NEW_PLAYER, FILE_CHANGE } from "../../utils/constants/actionTypes";
import {
  getRandomColor,
  generatePlayer
} from "../../utils/helpers/playerHelpers";

// Interfaces
import { IPlayers, PlayerActions } from "./types";

const firstPlayerColor = getRandomColor()!;
const firstPlayerId = 1;

const initialState: IPlayers = {
  count: 1,
  current: {
    id: firstPlayerId,
    pos: "1",
    color: firstPlayerColor,
    score: 0,
    extra: 0,
    path: [1],
    boxPosition: -1 // center
  },
  all: [
    {
      id: firstPlayerId,
      pos: "1",
      color: firstPlayerColor,
      score: 0,
      extra: 0,
      path: [1],
      boxPosition: -1 // center
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

    case FILE_CHANGE: {
      console.log(action.payload.data);

      return {
        ...state
      }
    }

    default:
      return state;
  }
};
