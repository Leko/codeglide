// FIXME: Arrange dependency
import { SearchParams } from "../../usecases/searchCode";

export type History = {
  // It's not same as `createdAt`. All histories can use multiple times.
  // When search some query, searchedAt will update current time
  searchedAt: number; // Unit timestamp with millseconds
  digest: string;
  query: SearchParams;
};
export type State = {
  histories: {
    [digest: string]: History;
  };
};

export const getInitialState = (): State => ({
  histories: {}
});

export const Namespace = "searchHistory";
