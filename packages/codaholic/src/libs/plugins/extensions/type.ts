import { Dispatch } from "redux";

export type ContextMenu = {
  message: string;
  onPress: () => any;
};

export interface Extension {
  test: RegExp;
  getContextMenu(dispatch: Dispatch, token: string): Array<ContextMenu>;
}
