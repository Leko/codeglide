import * as searchHistory from "./searchHistory";
import * as repositoryHistory from "./repositoryHistory";
import * as searchParams from "./searchParams";
import * as searchRepository from "./searchRepository";
import * as searchDirectory from "./searchDirectory";
import * as searchCode from "./searchCode";
import * as codeView from "./codeView";

export { Repository } from "./Repository";
export {
  TreeEntry,
  ShallowTree,
  isFile,
  omitFile,
  fileTypeComparator
} from "./ShallowTree";
export { FileContent } from "./FileContent";
export {
  CodeSearchResult,
  CodeSearchResultItem,
  CodeSearchResultItemMatch
} from "./CodeSearchResult";
export { CodeSearchParams } from "./CodeSearchParams";

export {
  History as SearchHistory,
  State as SearchHistoryState
} from "./searchHistory/state";
export {
  History as RepositoryHistory,
  State as RepositoryHistoryState
} from "./repositoryHistory/state";
export { State as SearchParamsState } from "./searchParams/state";
export { State as SearchRepositoryState } from "./searchRepository/state";
export { State as SearchDirectoryState } from "./searchDirectory/state";
export { State as SearchCodeState } from "./searchCode/state";
export { State as CodeViewState } from "./codeView/state";

export {
  searchHistory,
  repositoryHistory,
  searchParams,
  searchRepository,
  searchDirectory,
  searchCode,
  codeView
};
