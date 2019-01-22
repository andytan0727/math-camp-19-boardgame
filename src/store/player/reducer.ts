import cuid from "cuid";

import { ADD_NEW_PLAYER } from "../../utils/constants/actionTypes";
import { getRandomColor, generatePlayer } from "../../utils/helpers/playerHelpers";

// Interfaces
import { IPlayers, AddNewPlayerAction } from './types'

const firstPlayerColor = getRandomColor()!;
const firstPlayerId = cuid();

const initialState: IPlayers = {
  count: 1,
  current: {
    id: firstPlayerId,
    pos: 1,
    color: firstPlayerColor,
    score: 0,
    path: [1],
    boxPosition: -1 // center
  },
  all: [
    {
      id: firstPlayerId,
      pos: 1,
      color: firstPlayerColor,
      score: 0,
      path: [1],
      boxPosition: -1 // center
    }
  ]
};

export const players = (state = initialState, action: AddNewPlayerAction) => {
  switch (action.type) {
    case ADD_NEW_PLAYER:
      const newPlayer = generatePlayer();

      return {
        ...state,
        all: [
          ...state.all,
          newPlayer
        ],
        count: state.count + 1
      };

    default:
      return state;
  }
};
