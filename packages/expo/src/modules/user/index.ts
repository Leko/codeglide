import { createAggregate } from "redux-aggregate";
import { State, Namespace } from "./state";
import * as selectors from "./selectors";

const initialState = (): State => ({
  boardedAt: null,
  avatarUrl: null,
  displayName: null,
  accessToken: null
});

const setCredential = (
  state: State,
  {
    avatarUrl,
    displayName,
    accessToken
  }: { avatarUrl: string; displayName: string; accessToken: string }
): State => ({
  ...state,
  avatarUrl,
  displayName,
  accessToken
});

const completeOnBoarding = (state: State, now: Date): State => ({
  ...state,
  boardedAt: now.toISOString()
});

const logout = () => initialState();

const mutations = { setCredential, logout, completeOnBoarding };

export const { types, creators, reducerFactory } = createAggregate(
  mutations,
  `${Namespace}/`
);

export default reducerFactory(initialState());

export { selectors };
