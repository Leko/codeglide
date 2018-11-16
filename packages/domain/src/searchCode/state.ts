import { CodeSearchResultItem } from "../CodeSearchResult";

export type State = {
  readonly errors: Array<Error>;
  readonly items: Array<CodeSearchResultItem>;
  readonly searched: boolean;
  readonly busy: boolean;
  readonly totalResults: number;
  readonly currentResults: number;
  readonly completed: boolean;
};
