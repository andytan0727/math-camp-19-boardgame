import { CHANGE_DIMENSIONS } from "../utils/constants/actionTypes";

export const changeDimensions = width => ({
  type: CHANGE_DIMENSIONS,
  width
});
