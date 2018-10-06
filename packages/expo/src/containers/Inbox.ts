import { connect } from "react-redux";
import { creators } from "../modules/topics";
import Inbox from "../components/molecules/Inbox";
import { Topic } from "../modules/topics";

type Props = {
  topic: Topic;
};

const mapStateToProps = (state: any, { topic }: Props) => {
  const notifications = Object.keys(state.topics[topic] || {});
  const id = notifications.length ? notifications[0] : null;
  return {
    id,
    notification: id ? state.topics[topic][id] : null
  };
};

const mapDispatchToProps = (dispatch: any, { topic }: Props) => ({
  dismiss(id: string) {
    dispatch(creators.dismiss({ topic, id }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
