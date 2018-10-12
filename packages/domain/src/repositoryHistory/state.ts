import { Repository } from "../Repository";

export type History = {
  digest: string;
  repository: Repository;
  lastOpenedAt: number; // UNIT timestamp
};
export type State = {
  histories: {
    [digest: string]: History;
  };
};

export const getInitialState = (): State => ({
  histories: {}
});

// FIXME: Omit from domain
export const Namespace = "repositoryHistory";
