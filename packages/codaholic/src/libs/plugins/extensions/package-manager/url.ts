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
        slug: "url/open-in-browser",
        message: "Open in browser",
        onPress: () => {
          dispatch(creators.openInBrowser({ url: token }));
        }
      }
    ];
  }
};

export default npm;
