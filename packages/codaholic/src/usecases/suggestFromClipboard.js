import parse from "github-url-to-object";
import { creators, TOPIC_CLIPBOARD } from "../modules/topics";

export default clipboardText => async dispatch => {
  const url = parse(clipboardText);
  if (!url) {
    return;
  }

  const notification = {
    id: "CLIPBOARD",
    message: "GitHub url detected", // FIXME: i18n
    meta: {
      url: url.https_url
    }
  };
  dispatch(creators.publish({ topic: TOPIC_CLIPBOARD, notification }));
};
