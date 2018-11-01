// FIXME: Arrange dependency
import { State as SearchParams } from "../searchParams/state";

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
