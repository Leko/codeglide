import { LanguageName } from "@codeglide/languages";

export type OwnerType = "User" | "Organization";

export type SearchRepositoryItem = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    received_events_url: string;
    type: OwnerType;
  };
  private: boolean;
  html_url: string;
  description: string;
  fork: false;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: LanguageName;
  forks_count: number;
  open_issues_count: number;
  master_branch: string;
  default_branch: string;
  score: number;
};

export type SearchRepositoryResult = {
  total_count: number;
  incomplete_results: boolean;
  items: ReadonlyArray<SearchRepositoryItem>;
};

export type State = {
  fetching: boolean;
  totalCount: number;
  loadedCount: number;
  incomplete: boolean;
  repositories: ReadonlyArray<SearchRepositoryItem>;
};
