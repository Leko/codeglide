export type State = {
  readonly contents: string | null;
  readonly repository: string | null;
  readonly path: string | null;
};

export const getInitialState = (): State => ({
  contents: null,
  repository: null,
  path: null
});

export const Namespace = "file";
