import { createAggregate } from "redux-aggregate";

export type State = {
  readonly accessToken: string | null;
};

const initialState = (): State => ({ accessToken: null });

const setCredential = (state: any, accessToken: string): State => ({
  ...state,
  accessToken
});

const logout = (state: any) => ({
  ...state,
  accessToken: null
});

const mutations = { setCredential, logout };

export const { types, creators, reducerFactory } = createAggregate(
  mutations,
  "user/"
);

export default reducerFactory(initialState());
