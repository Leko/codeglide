import { creators, TOPIC_CLIPBOARD } from "../modules/topics";

export default () => async dispatch => {
  dispatch(creators.dismiss({ topic: TOPIC_CLIPBOARD, id: "CLIPBOARD" }));
};
