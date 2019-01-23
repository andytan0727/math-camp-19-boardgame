import cuid from "cuid";

// Interfaces
import { ISinglePlayerObj } from "../../store/player/types";

const colorPalette: string[] = [
  "#5f6977",
  "#997f6c",
  "#7f5954",
  "#d8b477",
  "#789960",
  "#a7db64",
  "#3271ad",
  "#4c4096",
  "#c14188",
  "#8c3c88"
];

export const getRandomColor = () => {
  if (colorPalette.length) {
    return colorPalette.pop();
  }
  return undefined;
};

export const generatePlayer = (): ISinglePlayerObj => ({
  id: cuid(),
  color: getRandomColor()!,
  pos: 1,
  path: [1],
  score: 0,
  boxPosition: -1
});
