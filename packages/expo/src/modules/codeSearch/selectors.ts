import { createSelector } from "reselect";
import { Namespace, State } from "./state";
import { State as AppState } from "../state";

const stripPrefix = (state: AppState) => state[Namespace];

export const isBusy = createSelector(stripPrefix, (state: State) => state.busy);

export const isSearched = createSelector(
  stripPrefix,
  (state: State) => state.searched
);

export const getErrors = createSelector(
  stripPrefix,
  (state: State) => state.errors
);

export const getTotal = createSelector(
  stripPrefix,
  (state: State) => state.totalResults
);

export const getCurrent = createSelector(
  stripPrefix,
  (state: State) => state.currentResults
);

export const getResults = createSelector(
  stripPrefix,
  (state: State) => state.results
);

export const hasMoreResult = createSelector(
  stripPrefix,
  (state: State) => !state.completed
);
