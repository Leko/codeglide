import * as searchHistory from "./searchHistory";
import * as repositoryHistory from "./repositoryHistory";
import * as searchParams from "./searchParams";

export { Repository } from "./Repository";
export {
  TreeEntry,
  ShallowTree,
  isFile,
  omitFile,
  fileTypeComparator
} from "./ShallowTree";
export {
  CodeSearchResult,
  CodeSearchResultItem,
  CodeSearchResultItemMatch
} from "./CodeSearchResult";

export {
  History as SearchHistory,
  State as SearchHistoryState
} from "./searchHistory/state";
export {
  History as RepositoryHistory,
  State as RepositoryHistoryState
} from "./repositoryHistory/state";
export { State as SearchParamsState } from "./searchParams/state";
export { searchHistory, repositoryHistory, searchParams };
