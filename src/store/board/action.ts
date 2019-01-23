import { CHANGE_DIMENSIONS } from "../../utils/constants/actionTypes";

export const changeDimensions = (width: number) => ({
  type: CHANGE_DIMENSIONS,
  payload: {
    width
  }
});
