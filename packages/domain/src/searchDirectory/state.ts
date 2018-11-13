import { ShallowTree } from "../ShallowTree";

export type State = {
  fetching: boolean;
  path: string;
  shallowTree: ShallowTree;
};
