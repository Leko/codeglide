export {
  History as SearchHistory,
  State as SearchHistoryState
} from "./searchHistory/state";
export { History as RepositoryHistory } from "./repositoryHistory/state";
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
export { SearchParams } from "./SearchParams";
