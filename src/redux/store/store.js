import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { Cookies } from 'react-cookie';
const cookie = new Cookies({
  secure: true,
  httpOnly: true,
  maxAge: 24*60*60*7,
});

const middlewares = [thunk];

if (process.env.NODE_ENV == "development") {
  middlewares.push(logger);
}

function saveToLocaleStorage(state) {
  try {
    if (typeof Storage !== "undefined") {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    }
  } catch (e) {
    // console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    if (typeof Storage !== "undefined") {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return undefined;
      }

      return JSON.parse(serializedState);
    }
  } catch (e) {
    // console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

store.subscribe(() => saveToLocaleStorage(store.getState()));

export default store;
