import { State, SearchRepositoryResult } from "./state";

export const makeBusy = (state: State): State => {
  return {
    ...state,
    fetching: true
  };
};

export const setResult = (
  state: State,
  result: SearchRepositoryResult
): State => {
  return {
    ...state,
    fetching: false,
    totalCount: result.total_count,
    loadedCount: result.items.length,
    incomplete: result.incomplete_results,
    repositories: result.items
  };
};

export const appendResult = (
  state: State,
  result: SearchRepositoryResult
): State => {
  return {
    ...state,
    fetching: false,
    totalCount: result.total_count,
    loadedCount: state.loadedCount + result.items.length,
    incomplete: result.incomplete_results,
    repositories: state.repositories.concat(result.items)
  };
};
