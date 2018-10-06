import parse from "github-url-to-object";
import { creators, TOPIC_CLIPBOARD } from "../modules/topics";
import { selectors } from "../modules/file";
import * as analytics from "../libs/ga";

export default clipboardText => async (dispatch, getState) => {
  const url = parse(clipboardText);
  if (!url || !url.repo || !url.user) {
    return;
  }
  const { repo, user } = url;

  const openingRepository = selectors.getRepository(getState());
  if (openingRepository === `${user}/${repo}`) {
    return;
  }

  const id = "CLIPBOARD";
  const HIDE_THRESHOLD = 5000;
  const notification = {
    id,
    message: "GitHub repoository detected", // FIXME: i18n
    meta: {
      repo,
      user,
      visible: true
    }
  };
  analytics.trackEvent("clipboard", "suggest", { label: `${repo}/${user}` });
  dispatch(creators.publish({ topic: TOPIC_CLIPBOARD, notification }));
  setTimeout(() => {
    dispatch(
      creators.publish({
        topic: TOPIC_CLIPBOARD,
        notification: {
          ...notification,
          meta: {
            ...notification.meta,
            visible: false
          }
        }
      })
    );
  }, HIDE_THRESHOLD);
};
