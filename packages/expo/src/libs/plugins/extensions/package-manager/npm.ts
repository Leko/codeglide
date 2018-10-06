import { Extension } from "../type";
import { creators } from "../../../../modules/deepLink";

const npm: Extension = {
  test: /\.(js|json)$/,
  async getContextMenu(dispatch, token) {
    return [
      {
        slug: "npm/search-in-npmjs.com",
        message: "Search in npmjs.com",
        onPress: () => {
          dispatch(
            creators.openInBrowser({
              url: `https://www.npmjs.com/package/${token}`
            })
          );
        }
      }
    ];
  }
};

export default npm;
