import { CodeSearchResult } from "../CodeSearchResult";
import { State } from "./state";

export const clear = () => ({
  searched: false,
  busy: false,
  errors: [],
  items: null,
  totalResults: 0,
  currentResults: 0,
  completed: true
});

export const start = (state: State) => ({
  ...state,
  busy: true
});

export const setErrors = (state: State, errors: Array<Error>) => ({
  ...state,
  errors
});

export const setResults = (state: State, result: CodeSearchResult) => ({
  ...state,
  errors: [],
  searched: true,
  busy: false,
  items: result.items,
  totalResults: result.total_count,
  currentResults: result.items.length,
  completed: result.incomplete_results
});

export const appendResults = (state: State, result: CodeSearchResult) => {
  const nextResults = state.items.concat(result.items);
  const nextResultsCount = nextResults.length;
  return {
    ...state,
    busy: false,
    items: nextResults,
    currentResults: nextResultsCount,
    completed: result.incomplete_results
  };
};
