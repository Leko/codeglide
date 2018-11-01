// @ts-ignore
import { MD5 } from "jshashes";
import { State, History } from "./state";
import { CodeSearchParams } from "../CodeSearchParams";

const md5 = new MD5();

export const append = (state: State, query: CodeSearchParams): State => {
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
