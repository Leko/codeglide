import { State as UserState } from "./user";
import { State as TopicsState } from "./topics";
import {
  Namespace as CodeSearchNamespace,
  State as CodeSearchState
} from "./codeSearch/state";

export type State = {
  user: UserState;
  topics: TopicsState;
  [CodeSearchNamespace]: CodeSearchState;
};
