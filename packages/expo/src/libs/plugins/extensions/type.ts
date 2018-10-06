import { Dispatch } from "redux";

export type ContextMenu = {
  slug: string;
  message: string;
  onPress: () => any;
};

export interface Extension {
  test: RegExp;
  getContextMenu(
    dispatch: Dispatch,
    token: string
  ): Promise<Array<ContextMenu>>;
}
