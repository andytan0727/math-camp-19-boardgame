import {
  START_GAME,
  NEXT_GAME,
  INITIALIZE_DATA,
  UPDATE_DATA,
  SET_GAME,
  TOGGLE_BEGIN_CURRENT_GAME,
  RESTORE_GAME
} from "../../utils/constants/actionTypes";

export const startGame = () => {
  return {
    type: START_GAME
  };
};

export const nextGame = () => {
  return {
    type: NEXT_GAME
  };
};

export const initializeData = (data: Array<number>) => {
  return {
    type: INITIALIZE_DATA,
    payload: {
      data
    }
  };
};

export const updateData = (data: Array<number>) => {
  return {
    type: UPDATE_DATA,
    payload: {
      data
    }
  };
};

export const setGame = (game: number) => {
  return {
    type: SET_GAME,
    payload: {
      game
    }
  };
};

export const toggleBeginCurrentGame = () => {
  return {
    type: TOGGLE_BEGIN_CURRENT_GAME
  };
};

export const restoreGame = (game: {
  currentGame: number;
  gameData: Array<number>;
}) => {
  return {
    type: RESTORE_GAME,
    payload: {
      game
    }
  };
};
