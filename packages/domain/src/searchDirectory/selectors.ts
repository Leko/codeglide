import sortBy from "lodash/sortBy";
import { State } from "./state";
import { ShallowTree, omitFile } from "../ShallowTree";

export const sortByAlphabetical = (state: State): ShallowTree => {
  return sortBy(omitFile(state.shallowTree), repository => repository.name);
};

export const getPaths = (state: State) => state.path.split("/").filter(Boolean);

export const inFetching = (state: State) => state.fetching;
