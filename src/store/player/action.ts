// Constants
import { ADD_NEW_PLAYER, ADD_FILE } from "../../utils/constants/actionTypes";
import { AddNewPlayerAction, IScoresAll } from "./types";

// Actions
export const addNewPlayer = (): AddNewPlayerAction => {
  return {
    type: ADD_NEW_PLAYER
  };
};

export const addFile = (data: Array<IScoresAll>) => {
  return {
    type: ADD_FILE,
    payload: {
      data
    }
  };
};
