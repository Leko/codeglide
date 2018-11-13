import sortBy from "lodash/sortBy";
import { State, SearchRepositoryItem } from "./state";
import { Repository } from "../Repository";

export const sortByStargazer = (state: State): ReadonlyArray<Repository> => {
  return sortBy(
    state.repositories,
    repository => repository.stargazers_count
  ).map((repository: SearchRepositoryItem) => ({
    owner: repository.owner.login,
    repository: repository.name
  }));
};

export const inFetching = (state: State) => state.fetching;
