export type CodeSearchResult = {
  total_count: number;
  incomplete_results: boolean;
  items: ReadonlyArray<CodeSearchResultItem>;
};

export type CodeSearchResultItemMatch = {
  fragment: string;
  matches: Array<{
    indices: [number, number];
    text: string;
  }>;
  object_url: string;
  property: "content"; // FIXME
  object_type: "FileContent"; // FIXME
};

export type CodeSearchResultItem = {
  git_url: string;
  name: string;
  path: string;
  score: number;
  sha: string;
  text_matches: Array<CodeSearchResultItemMatch>;
  repository: {
    id: string;
    name: string;
    full_name: string;
    description: string;
    private: boolean;
    fork: boolean;
    languages_url: boolean;
    owner: {
      id: string;
      avatar_url: string;
      login: string;
      type: "User"; // FIXME
    };
  };
};
