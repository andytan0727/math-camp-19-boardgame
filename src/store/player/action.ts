// Constants
import { ADD_NEW_PLAYER } from "../../utils/constants/actionTypes";
import { AddNewPlayerAction } from "./types";

// Actions
export const addNewPlayer = (): AddNewPlayerAction => {
  return {
    type: ADD_NEW_PLAYER
  };
};
