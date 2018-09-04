import parse from "github-url-to-object";
import { creators, TOPIC_CLIPBOARD } from "../modules/topics";
import { selectors } from "../modules/file";

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

  const notification = {
    id: "CLIPBOARD",
    message: "GitHub repoository detected", // FIXME: i18n
    meta: {
      repo,
      user
    }
  };
  dispatch(creators.publish({ topic: TOPIC_CLIPBOARD, notification }));
};
