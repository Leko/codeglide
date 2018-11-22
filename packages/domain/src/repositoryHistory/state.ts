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
