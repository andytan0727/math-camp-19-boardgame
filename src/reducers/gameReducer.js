import { START_GAME } from "../utils/constants/actionTypes";

const initialState = {
  gameNum: 0
};

export const game = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        gameNum: "game_1"
      };
    default:
      return state;
  }
};
