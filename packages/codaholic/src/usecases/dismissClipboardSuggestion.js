import { creators, TOPIC_CLIPBOARD } from "../modules/topics";
import * as analytics from "../libs/ga";

export default () => async dispatch => {
  analytics.trackEvent("clipboard", "dismiss");
  dispatch(creators.dismiss({ topic: TOPIC_CLIPBOARD, id: "CLIPBOARD" }));
};
