import { MD5 } from "jshashes";
import { State, History } from "./state";
// FIXME: Arrange dependency
import { SearchParams } from "../../usecases/searchCode";

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
