// FIXME: Arrange dependency
import { CodeSearchParams } from "../CodeSearchParams";

export type History = {
  // It's not same as `createdAt`. All histories can use multiple times.
  // When search some query, searchedAt will update current time
  searchedAt: number; // Unit timestamp with millseconds
  digest: string;
  query: CodeSearchParams;
};
export type State = {
  histories: {
    [digest: string]: History;
  };
};
