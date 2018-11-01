// @ts-ignore
import { MD5 } from "jshashes";
import { State, History } from "./state";
import { State as SearchParams } from "../searchParams/state";

const md5 = new MD5();

export const append = (state: State, query: SearchParams): State => {
  const digest = md5.hex(JSON.stringify(query));
  const history: History = {
    query,
    digest,
    searchedAt: new Date().getTime()
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
