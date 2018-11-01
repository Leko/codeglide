import { createSelector } from "reselect";
import sortBy from "lodash/sortBy";
import { State, History } from "./state";

export const getHistories = (state: State) => state.histories;

export const getLRUHistories = createSelector(
  getHistories,
  (histories: { [digest: string]: History }) =>
    sortBy(Object.values(histories), (h: History) => -h.searchedAt)
);
