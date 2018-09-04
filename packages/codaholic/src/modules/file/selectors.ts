import { createSelector } from "reselect";
import { Namespace, State } from "./state";
import { State as AppState } from "../state";

const stripPrefix = (state: AppState) => state[Namespace];

export const getContents = createSelector(
  stripPrefix,
  (state: State) => state.contents
);

export const getRepository = createSelector(
  stripPrefix,
  (state: State) => state.repository
);
