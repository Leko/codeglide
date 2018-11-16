import { State } from "./state";

export const isBusy = (state: State) => state.busy;

export const isSearched = (state: State) => state.searched;

export const getErrors = (state: State) => state.errors;

export const getTotal = (state: State) => state.totalResults;

export const getCurrent = (state: State) => state.currentResults;

export const getResults = (state: State) => state.items;

export const hasMoreResult = (state: State) => !state.completed;
