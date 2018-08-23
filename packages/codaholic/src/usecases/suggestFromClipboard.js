import parse from "github-url-to-object";
import { creators, TOPIC_CLIPBOARD } from "../modules/topics";

export default clipboardText => async dispatch => {
  const url = parse(clipboardText);
  if (!url || !url.repo || !url.user) {
    return;
  }
  const { repo, user } = url;

  const notification = {
    id: "CLIPBOARD",
    message: "GitHub repo detected", // FIXME: i18n
    meta: {
      repo,
      user
    }
  };
  dispatch(creators.publish({ topic: TOPIC_CLIPBOARD, notification }));
};
