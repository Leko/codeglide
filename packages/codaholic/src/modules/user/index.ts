import { createAggregate } from "redux-aggregate";

export type State = {
  readonly accessToken: string | null;
};

const initialState = (): State => ({ accessToken: null });

const setCredential = (state: State, accessToken: string): State => ({
  ...state,
  accessToken
});

const logout = (state: State) => ({
  ...state,
  accessToken: null
});

const mutations = { setCredential, logout };

export const { types, creators, reducerFactory } = createAggregate(
  mutations,
  "user/"
);

export default reducerFactory(initialState());
