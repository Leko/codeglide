import { State, getInitialState } from "./state";

export const open = (
  state: State,
  {
    contents,
    repository,
    path
  }: {
    contents: string;
    repository: string;
    path: string;
  }
): State => ({
  ...state,
  contents,
  repository,
  path
});

export const dismiss = (): State => getInitialState();
