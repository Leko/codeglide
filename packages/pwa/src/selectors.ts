import {
  searchHistory as searchHistoryModule,
  repositoryHistory as repositoryHistoryModule,
  searchParams as searchParamsModule,
  searchRepository as searchRepositoryModule,
  searchDirectory as searchDirectoryModule
} from "@codeglide/domain";
import { namespaceStripper } from "./store";

export const searchHistory = namespaceStripper("searchHistory")(
  searchHistoryModule.selectors
);
export const repositoryHistory = namespaceStripper("repositoryHistory")(
  repositoryHistoryModule.selectors
);
export const searchParams = namespaceStripper("searchParams")(
  searchParamsModule.selectors
);
export const searchRepository = namespaceStripper("searchRepository")(
  searchRepositoryModule.selectors
);
export const searchDirectory = namespaceStripper("searchDirectory")(
  searchDirectoryModule.selectors
);
