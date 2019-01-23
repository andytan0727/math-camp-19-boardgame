// Constants
import { ADD_NEW_PLAYER } from "../../utils/constants/actionTypes";

// Actions
export const addNewPlayer = (curId: number) => {
  return {
    type: ADD_NEW_PLAYER,
    payload: {
      curId
    }
  };
};