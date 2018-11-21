import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  SearchHistoryState,
  RepositoryHistoryState,
  SearchParamsState,
  SearchRepositoryState,
  SearchDirectoryState,
  SearchCodeState,
  CodeViewState
} from "@codeglide/domain";
import {
  searchHistory,
  repositoryHistory,
  searchParams,
  searchRepository,
  searchDirectory,
  searchCode,
  codeView
} from "./modules";

export type State = {
  searchHistory: SearchHistoryState;
  repositoryHistory: RepositoryHistoryState;
  searchParams: SearchParamsState;
  searchRepository: SearchRepositoryState;
  searchDirectory: SearchDirectoryState;
  searchCode: SearchCodeState;
  codeView: CodeViewState;
};
type NSStrippedSelectors<T> = { [K in keyof T]: (state: State) => T[K] };

export const store = createStore(
  combineReducers({
    // @ts-ignore imcompatible with undefined
    searchHistory: searchHistory.reducerFactory({
      histories: {}
    }),
    // @ts-ignore imcompatible with undefined
    repositoryHistory: repositoryHistory.reducerFactory({
      histories: {}
    }),
    // @ts-ignore imcompatible with undefined
    searchParams: searchParams.reducerFactory({
      q: ""
    }),
    // @ts-ignore imcompatible with undefined
    searchRepository: searchRepository.reducerFactory({
      fetching: false,
      totalCount: -1,
      loadedCount: -1,
      incomplete: false,
      repositories: []
    }),
    // @ts-ignore imcompatible with undefined
    searchDirectory: searchDirectory.reducerFactory({
      fetching: false,
      path: "",
      shallowTree: []
    }),
    // @ts-ignore imcompatible with undefined
    searchCode: searchCode.reducerFactory({
      searched: false,
      busy: false,
      errors: [],
      items: null,
      totalResults: 0,
      currentResults: 0,
      completed: true
    }),
    // @ts-ignore imcompatible with undefined
    codeView: codeView.reducerFactory({
      file: null,
      content: null
    })
  }),
  applyMiddleware(thunk)
);

export const namespaceStripper = <K extends keyof State>(namespace: K) => <T>(
  m: T
): NSStrippedSelectors<T> =>
  Object.entries(m).reduce(
    (acc, [name, selector]) =>
      Object.assign(acc, {
        [name]: (state: State) => selector(state[namespace])
      }),
    {}
  ) as NSStrippedSelectors<T>;
