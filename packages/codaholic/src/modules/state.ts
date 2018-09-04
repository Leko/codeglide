import { State as UserState } from "./user";
import { State as TopicsState } from "./topics";
import {
  Namespace as CodeSearchNS,
  State as CodeSearchState
} from "./codeSearch/state";
import { Namespace as FileNS, State as FileState } from "./file/state";
import {
  Namespace as SearchHistoryNS,
  State as SearchHistoryState
} from "./searchHistory/state";

export type State = {
  user: UserState;
  topics: TopicsState;
  [CodeSearchNS]: CodeSearchState;
  [FileNS]: FileState;
  [SearchHistoryNS]: SearchHistoryState;
};
