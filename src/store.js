import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/rootReducer";

const logger = createLogger();
// const store = createStore(rootReducer, applyMiddleware(thunk, logger));

console.log(process.env.NODE_ENV);
const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducer, applyMiddleware(thunk, logger))
    : createStore(rootReducer, applyMiddleware(thunk));

export default store;
