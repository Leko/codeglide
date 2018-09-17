import isUrl from "is-url";
import { Extension } from "../type";
import { creators } from "../../../../modules/deepLink";

const npm: Extension = {
  test: /.*/,
  async getContextMenu(dispatch, token) {
    if (!isUrl(token)) {
      return [];
    }

    return [
      {
        message: "Open in browser",
        onPress: () => {
          dispatch(creators.openInBrowser({ url: token }));
        }
      }
    ];
  }
};

export default npm;
