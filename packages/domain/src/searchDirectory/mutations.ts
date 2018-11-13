import { State } from "./state";
import { ShallowTree } from "../ShallowTree";

export const makeBusy = (state: State): State => {
  return {
    ...state,
    fetching: true
  };
};

export const setResult = (
  state: State,
  {
    path,
    shallowTree
  }: {
    path: string;
    shallowTree: ShallowTree;
  }
): State => {
  return {
    ...state,
    fetching: false,
    path,
    shallowTree
  };
};
