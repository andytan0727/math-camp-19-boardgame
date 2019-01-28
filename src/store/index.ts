import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { combineReducers } from "redux";

// Reducers
import { board } from "./board/reducer";
import { game } from "./game/reducer";
import { players } from "./player/reducer";

const logger = createLogger();

export const rootReducer = combineReducers({
  board,
  game,
  players
});

const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducer, applyMiddleware(thunk, logger))
    : createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type AppState = ReturnType<typeof rootReducer>;
