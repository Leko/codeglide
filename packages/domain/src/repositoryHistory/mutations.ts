// @ts-ignore
import { State, History } from "./state";

export const append = (
  state: State,
  { owner, repository }: { owner: string; repository: string }
): State => {
  const digest = `${owner}/${repository}`;
  const history: History = {
    digest,
    repository: {
      owner,
      repository
    },
    lastOpenedAt: new Date().getTime()
  };

  return {
    ...state,
    histories: {
      ...state.histories,
      [digest]: history
    }
  };
};

export const destroy = (state: State, digest: string): State => {
  const { [digest]: _, ...histories } = state.histories;
  return {
    ...state,
    histories
  };
};
