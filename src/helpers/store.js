import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";
import logger from "redux-logger";
// Logger with default options

// You may not call store.getState() while the reducer is executing.”  to avoid this error  composeEnhancers commented

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}
const composeEnhancers = compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, ...middlewares))
);
