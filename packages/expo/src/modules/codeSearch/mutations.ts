import { State, Result, getInitialState } from "./state";

export const clear = (state: State) => getInitialState();

export const start = (state: State) => ({
  ...state,
  busy: true
});

export const setErrors = (state: State, errors: Array<Error>) => ({
  ...state,
  errors
});

export const setResults = (
  state: State,
  {
    results,
    totalResults,
    completed
  }: {
    results: Array<Result>;
    totalResults: number;
    completed: boolean;
  }
) => ({
  ...state,
  errors: [],
  searched: true,
  busy: false,
  results,
  totalResults,
  currentResults: results.length,
  completed
});

export const appendResults = (state: State, results: Array<Result>) => {
  const nextResults = state.results.concat(results);
  const nextResultsCount = nextResults.length;
  return {
    ...state,
    busy: false,
    results: nextResults,
    currentResults: nextResultsCount,
    completed: nextResultsCount >= state.totalResults
  };
};
