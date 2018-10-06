import { createSelector } from "reselect";
import sortBy from "lodash/sortBy";
import { Namespace, State, History } from "./state";
import { State as AppState } from "../state";

const stripPrefix = (state: AppState) => state[Namespace];

export const getHistories = createSelector(
  stripPrefix,
  (state: State) => state.histories
);

export const getLRUHistories = createSelector(
  getHistories,
  (histories: Array<History>) =>
    sortBy(Object.values(histories), h => -h.searchedAt)
);
