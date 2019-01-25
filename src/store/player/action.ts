// Constants
import { ADD_NEW_PLAYER, FILE_CHANGE } from "../../utils/constants/actionTypes";
import { AddNewPlayerAction } from "./types";

// Actions
export const addNewPlayer = (): AddNewPlayerAction => {
  return {
    type: ADD_NEW_PLAYER
  };
};

export const fileChange = (data: string) => {
  return {
    type: FILE_CHANGE,
    payload: data
  }
}