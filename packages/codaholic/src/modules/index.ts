import {
  combineReducers,
  applyMiddleware,
  createStore as createReduxStore
} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import user, { State as UserState } from "./user";
import topics, { State as TopicsState } from "./topics";

export type State = {
  user: UserState;
  topics: TopicsState;
};

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
    topics: topics as any
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
