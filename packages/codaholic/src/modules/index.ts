import {
  combineReducers,
  applyMiddleware,
  createStore as createReduxStore
} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import user from "./user";
import topics from "./topics";
import codeSearch from "./codeSearch";
import file from "./file";

const storage = createSecureStore();
const reducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["user"]
  },
  combineReducers({
    // FIXME: 動かない
    user: user as any,
    topics: topics as any,
    codeSearch: codeSearch as any,
    file: file as any
  })
);
const middlewares = applyMiddleware(thunk);

export const createStore = () => {
  const store = createReduxStore(reducer, middlewares);
  const persistor = persistStore(store);
  return {
    store,
    persistor
  };
};
