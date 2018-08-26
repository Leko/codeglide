export type Result = {
  name: string;
  path: string;
  score: number;
  sha: string;
  text_matches: Array<{
    fragment: string;
    matches: Array<{
      indices: [number, number];
      text: string;
    }>;
    object_url: string;
    property: "content"; // FIXME
    object_type: "FileContent"; // FIXME
  }>;
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

export type State = {
  readonly results: Array<Result>;
  readonly busy: boolean;
  readonly totalResults: number;
  readonly currentResults: number;
  readonly completed: boolean;
};

export const getInitialState = (): State => ({
  busy: false,
  results: [],
  totalResults: 0,
  currentResults: 0,
  completed: true
});

export const Namespace = "codeSearch";
