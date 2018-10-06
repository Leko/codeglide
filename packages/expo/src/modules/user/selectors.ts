import { createSelector } from "reselect";
import { Namespace, State } from "./state";
import { State as AppState } from "../state";

const stripPrefix = (state: AppState) => state[Namespace];

export const getCredential = createSelector(
  stripPrefix,
  (state: State) => state.accessToken
);

export const getAvatarUrl = createSelector(
  stripPrefix,
  (state: State) => state.avatarUrl
);

export const getDisplayName = createSelector(
  stripPrefix,
  (state: State) => state.displayName
);

export const isBoarded = createSelector(
  stripPrefix,
  (state: State) => state.boardedAt != null
);
