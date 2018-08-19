import omit from "lodash/omit";
import { createAggregate } from "redux-aggregate";

export type Notification = {
  id: string;
  message: string;
  meta: Object; // FIXME: Type parameter
};

export const TOPIC_CLIPBOARD = "TOPIC_CLIPBOARD";

export type Topic = typeof TOPIC_CLIPBOARD;

export type State = {
  [topic: string]: { [id: string]: Notification };
};

const initialState = (): State => ({
  [TOPIC_CLIPBOARD]: {}
});

const publish = (
  state: State,
  {
    topic,
    notification
  }: {
    topic: Topic;
    notification: Notification;
  }
): State => ({
  ...state,
  [topic]: Object.assign({ [notification.id]: notification }, state[topic])
});

const dismiss = (
  state: State,
  { topic, id }: { topic: Topic; id: string }
): State => ({
  ...state,
  [topic]: omit(state[topic], id)
});

const mutations = { publish, dismiss };

export const { types, creators, reducerFactory } = createAggregate(
  mutations,
  "topics/"
);

export default reducerFactory(initialState());
