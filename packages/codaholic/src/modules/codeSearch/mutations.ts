import { State, Result, getInitialState } from "./state";

export const clear = (state: State) => getInitialState();

export const start = (state: State) => ({
  ...state,
  busy: true
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
  busy: false,
  results,
  totalResults,
  _: console.log({ totalResults }),
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
