import { createAggregate } from "redux-aggregate";
import {
  searchHistory as searchHistoryModule,
  repositoryHistory as repositoryHistoryModule,
  searchParams as searchParamsModule,
  searchRepository as searchRepositoryModule,
  searchDirectory as searchDirectoryModule
} from "@codeglide/domain";

export const searchHistory = createAggregate(
  searchHistoryModule.mutations,
  "searchHistory/"
);
export const repositoryHistory = createAggregate(
  repositoryHistoryModule.mutations,
  "repositoryHistory/"
);
export const searchParams = createAggregate(
  searchParamsModule.mutations,
  "searchParams/"
);
export const searchRepository = createAggregate(
  searchRepositoryModule.mutations,
  "searchRepository/"
);
export const searchDirectory = createAggregate(
  searchDirectoryModule.mutations,
  "searchDirectory/"
);
